let questions = [];

// Function to fetch questions from the server
async function fetchQuestions(topic) {
    try {
        const response = await fetch(`http://localhost:5454/api/quiz/get?topic=${topic}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTUzMzQ5NjksImV4cCI6MzQzMDY3MDgzOSwiZW1haWwiOiJzY2phZ2F0aGFjaGlkYW1AZ21haWwuY29tIn0.oZwPQ0yn96WYVCB9tubFeLrQi1lJA0PqCRv9ld__1vA',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        questions = data;
        console.log(questions);

        // Check if questions array is null or empty
        if (!questions || questions.length === 0) {
            showNoQuestionsMessage();
        } else {
            startQuiz(); // Start the quiz after fetching questions
        }

    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.value;
        button.classList.add("ans-key");
        answerButtons.appendChild(button);
        if (answer.isCorrect) {
            button.dataset.isCorrect = answer.isCorrect;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.isCorrect === "true";
    if (correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.isCorrect === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function showNoQuestionsMessage() {
    resetState();
    questionElement.innerHTML = "No questions available for the selected topic.";
    nextButton.style.display = "none";
}

function updateFilters() {
    const selectedFilters = [];
    const checkboxes = document.querySelectorAll(".sidebar input[type='checkbox']:checked");
    
    checkboxes.forEach(checkbox => {
        selectedFilters.push(checkbox.id);
    });
    const topic = selectedFilters.join(",");
    fetchQuestions(topic);
}

function clearFilters() {
    const checkboxes = document.querySelectorAll(".sidebar input[type='checkbox']");
    checkboxes.forEach(checkbox => checkbox.checked = false);
    fetchQuestions("");
}

// Fetch questions when the page loads
fetchQuestions("");
