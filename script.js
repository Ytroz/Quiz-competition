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

// Log initial state
console.log("Quiz started. Total questions:", questions.length);

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

    // Log the current question being loaded
    console.log(`Question ${currentQuestion + 1}:`, q.text);
    console.log("Options:", q.options);
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

    // Log the user's answer and whether it was correct
    console.log("User answer:", userAnswer);
    console.log("Correct answer:", correctAnswer);
    console.log("Was it correct?", userAnswer === correctAnswer);

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
    resultHTML += `<button onclick="restartQuiz()">Restart Quiz</button>`;
    resultsDiv.innerHTML = resultHTML;

    // Log the final results
    console.log("Quiz ended. Final score:", `${score}/${questions.length}`);
    console.log("All answers:", answers);
}

// New restart function
function restartQuiz() {
    // Reset all variables
    currentQuestion = 0;
    score = 0;
    answers = [];

    // Hide results and show quiz container
    document.getElementById('results').style.display = 'none';
    document.querySelector('.quiz-container').style.display = 'block';

    // Load first question
    loadQuestion();

    // Log restart
    console.log("Quiz restarted. Total questions:", questions.length);
}