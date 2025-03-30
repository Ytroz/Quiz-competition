// Quiz questions
const questions = [
    {
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        text: "What is 5 - 3?",
        options: ["1", "2", "3", "4"],
        correct: "2"
    },
    {
        text: "What is 3 × 2?",
        options: ["5", "6", "7", "8"],
        correct: "6"
    }
];

let currentQuestion = 0;
let score = 0;
let answers = []; // To store user answers

// Load the first question
loadQuestion();

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    const q = questions[currentQuestion];
    document.getElementById('question').textContent = q.text;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'option';
        label.innerHTML = `
            <input type="radio" name="answer" value="${option}">
            ${option}
        `;
        optionsDiv.appendChild(label);
    });

    document.getElementById('score').textContent = `Score: ${score}/${questions.length}`;
}

function submitAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Please pick an answer!");
        return;
    }

    const userAnswer = selected.value;
    const correctAnswer = questions[currentQuestion].correct;
    answers.push({
        question: questions[currentQuestion].text,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: userAnswer === correctAnswer
    });

    if (userAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;
    loadQuestion();
}

function endQuiz() {
    document.querySelector('.quiz-container').style.display = 'none';
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    let resultHTML = `<h2>Quiz Finished!</h2>
                    <p>Final Score: ${score}/${questions.length}</p>
                    <h3>Your Answers:</h3>`;
    answers.forEach((answer, index) => {
        resultHTML += `
            <p>${index + 1}. ${answer.question}<br>
            Your Answer: ${answer.userAnswer} | Correct Answer: ${answer.correctAnswer} 
            ${answer.isCorrect ? '✅' : '❌'}</p>
        `;
    });
    resultsDiv.innerHTML = resultHTML;
}