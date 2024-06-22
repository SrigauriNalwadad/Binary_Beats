function clearFilters() {
    document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}

// To sort
document.addEventListener('DOMContentLoaded', function () {
    const sortByDropdown = document.querySelector('.sort-by-dropdown .dropdown-menu');
    const currentSortElement = document.getElementById('currentSort');

    sortByDropdown.addEventListener('click', function (e) {
        const selectedSort = e.target.getAttribute('data-sort');
        if (selectedSort) {
            currentSortElement.textContent = selectedSort;

            // Remove active class from all items and add it to the selected one
            const items = sortByDropdown.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    });
});

// Example problem set
const problems = [
    {
        title: "Addition of two numbers",
        difficulty: "Easy",
        topic: "Array",
        description: "Write a function that returns the sum of two numbers.",
        solution: `function add(a, b) {
            return a + b;
        }`,
        referenceLink: "https://example.com/reference",
        practiceLink: "https://example.com/practice"
    },
    {
        title: "To check Prime Number",
        difficulty: "Easy",
        topic: "Array",
        description: "Write a Program to Check Prime Number using a for loop",
        solution: `public class Main {

  public static void main(String[] args) {

    int num = 29;
    boolean flag = false;
    for (int i = 2; i <= num / 2; ++i) {
      // condition for nonprime number
      if (num % i == 0) {
        flag = true;
        break;
      }
    }

    if (!flag)
      System.out.println(num + " is a prime number.");
    else
      System.out.println(num + " is not a prime number.");
  }
}`,
        referenceLink: "https://example.com/reference",
        practiceLink: "https://example.com/practice"
    },
    // Add more problems here as needed
];

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
    difficultyTag.textContent = problem.difficulty;
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
    solutionSection.innerHTML = `<div class="section-title">Solution</div><pre><code class="language-java">${problem.solution}</code></pre>`;

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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('problems-container');
    problems.forEach((problem, index) => {
        const card = createProblemCard(problem, index);
        container.appendChild(card);
    });
});

