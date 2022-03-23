// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    runGame('addition');
});

/**
 * The main game 'loop', called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame(gameType) {
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}
/**
 * Checks the answer against the first element in the returned array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.querySelector('#answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        incrementScore();
        alert('Correct!!');

    } else {
        incrementWrongAnswer();
        alert(`Wrong, correct answer is ${calculatedAnswer[0]}`)
    }

    runGame(calculatedAnswer[1])
}

/**
 * Gets the operands and the operator directly
 * from the DOM and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.querySelector('#operand1').innerText);
    let operand2 = parseInt(document.querySelector('#operand2').innerText);
    let operator = document.querySelector('#operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply']
    } else {
        alert(`Unknown operator ${operator}`);
        throw `unknown operator ${operator}. Aborting`;
    }
}
/**
 * gets the current score from the dom and increments by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.querySelector('#score').innerText);
    document.querySelector('#score').innerText = ++oldScore;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.querySelector('#incorrect').innerText);
    document.querySelector('#incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.querySelector('#operand1').textContent = operand1;
    document.querySelector('#operand2').textContent = operand2;
    document.querySelector('#operator').textContent = '+';
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion(operand1, operand2) {
    document.querySelector('#operand1').textContent = operand1;
    document.querySelector('#operand2').textContent = operand2;
    document.querySelector('#operator').textContent = 'x';
}