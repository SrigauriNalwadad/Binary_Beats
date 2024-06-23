var topics = ''; // Initialize topics as empty string
var difficulty = ''; // Initialize difficulty as empty string
var sorting = ''; // Initialize sorting as empty string

function clearFilters() {
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    topics = ''; // Reset topics when filters are cleared
    difficulty = ''; // Reset difficulty when filters are cleared
    init(); // Re-fetch problems after clearing filters
}

function applyTopicFilters() {
    const selectedFilters = [];
    const checkboxes = document.querySelectorAll(".topics-section input[type='checkbox']:checked");

    checkboxes.forEach(checkbox => {
        selectedFilters.push(checkbox.id);
    });

    topics = selectedFilters.join(",");
    console.log('Selected topics:', topics); // Debugging statement
    init(); // Re-fetch problems after applying topic filters
}

function applyDifficultyFilters() {
    const selectedFilters = [];
    const checkboxes = document.querySelectorAll(".difficulty-section input[type='checkbox']:checked");

    checkboxes.forEach(checkbox => {
        selectedFilters.push(checkbox.id);
    });

    difficulty = selectedFilters.join(",");
    console.log('Selected difficulty:', difficulty); // Debugging statement
    init(); // Re-fetch problems after applying difficulty filters
}

document.addEventListener('DOMContentLoaded', function () {
    const sortByDropdown = document.querySelector('.sort-by-dropdown .dropdown-menu');
    const currentSortElement = document.getElementById('currentSort');

    sortByDropdown.addEventListener('click', function (e) {
        sorting = e.target.getAttribute('data-sort');
        console.log('Selected sorting:', sorting);
        currentSortElement.textContent = sorting; // Update UI with selected sorting option

        // Remove active class from all items and add it to the selected one
        const items = sortByDropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.classList.remove('active');
        });
        e.target.classList.add('active');

        init(); // Re-fetch problems after selecting sorting option
    });

    async function fetchProblems() {
        const apiUrl = `http://localhost:5454/api/code/?topic=${topics}&difficulty=${difficulty}&sort=${sorting}&page_no=0&paage_size=10`; // Construct API URL with dynamic parameters
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const problems = data.content;

            return problems;
        } catch (error) {
            console.error('Failed to fetch problems:', error);
            return [];
        }
    }

    function createProblemCard(problem, index) {
        const card = document.createElement('div');
        card.className = 'problem-card';

        const details = document.createElement('div');
        details.className = 'problem-details';

        const title = document.createElement('h3');
        title.textContent = problem.title;
        details.appendChild(title);

        const tags = document.createElement('div');
        tags.className = 'problem-tags';

        const difficultyTag = document.createElement('span');
        difficultyTag.className = 'problem-tag';
        difficultyTag.textContent = problem.difficulty_id;                ;
        tags.appendChild(difficultyTag);

        const topicTag = document.createElement('span');
        topicTag.className = 'problem-tag';
        topicTag.textContent = problem.topic;
        tags.appendChild(topicTag);

        details.appendChild(tags);

        const button = document.createElement('button');
        button.className = 'see-problem-button';
        button.innerHTML = `
            See Problem
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        `;
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#collapseProblem${index}`);

        card.appendChild(details);
        card.appendChild(button);

        const collapseContainer = document.createElement('div');
        collapseContainer.className = 'collapse';
        collapseContainer.id = `collapseProblem${index}`;

        const descriptionSection = document.createElement('div');
        descriptionSection.className = 'problem-description';
        descriptionSection.innerHTML = `<div class="section-title">Description of the question</div>${problem.description}`;

        const solutionSection = document.createElement('div');
        solutionSection.className = 'problem-solution';
        solutionSection.innerHTML = `<div class="section-title">Solution</div><pre><code class="language-java">${problem.code}</code></pre>`;

        const referenceSection = document.createElement('div');
        referenceSection.className = 'problem-reference';
        referenceSection.innerHTML = `<div class="section-title">Reference</div><a class="btn" href="${problem.referenceLink}" target="_blank">Link for Reference</a>`;

        const practiceSection = document.createElement('div');
        practiceSection.className = 'problem-practice';
        practiceSection.innerHTML = `<div class="section-title">Practice here</div><a class="btn" href="${problem.practiceLink}" target="_blank">Link for Practice</a>`;

        collapseContainer.appendChild(descriptionSection);
        collapseContainer.appendChild(solutionSection);
        collapseContainer.appendChild(referenceSection);
        collapseContainer.appendChild(practiceSection);

        card.appendChild(collapseContainer);

        return card;
    }

    

    async function init() {
        const problems = await fetchProblems(); // Fetch problems first
        const container = document.getElementById('problems-container');
        container.innerHTML = ''; // Clear existing content
        problems.forEach((problem, index) => {
            console.log(problem)
            const card = createProblemCard(problem[0], index);
            container.appendChild(card);
        });

        // Initialize Highlight.js after the problem cards are appended
        hljs.highlightAll();
    }

    // Make sure init function is accessible globally
    window.init = init;

    
    init();
});
