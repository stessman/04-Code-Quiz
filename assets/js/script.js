let questions = {
    questionOne : ["The Correct answer is 2", "answer one", "answer two", "answer three", "answer four", "2"],
    questionTwo : ["The Correct answer is 1", "answer one", "answer two", "answer three", "answer four", "1"],
    questionThree : ["The Correct answer is 4", "answer one", "answer two", "answer three", "answer four", "4"],
    questionFour : ["The Correct answer is 3", "answer one", "answer two", "answer three", "answer four", "3"],
    questionFive : ["The Correct answer is 3", "answer one", "answer two", "answer three", "answer four", "3"]
}
let questionField = document.querySelector("#questionField");
let startButton = document.querySelector("#startButton");
let timerField = document.querySelector("#timer");
let questionArea = document.querySelector("#answers");
let questionNumber;
let answerFields = document.querySelectorAll("li");
let answerItems = document.querySelector("#answers");
let correctWrongArea = document.querySelector("#correctWrongArea");
let userScoreField = document.querySelector("#userScoreField");
let timer;
let userGuess;
let getQuestionInfo;
let score;
let gameOver = false;

startButton.addEventListener("click", init);
answerItems.addEventListener("click", handleAnswerClick);

// Resets the page for a new quiz
function init() {
    // Need to display questionArea again
    gameOver = false;
    timer = 75;
    questionNumber = 0;
    setTimer();
    fillQuestionaire();
}

// Fills the quiz with a question and it's respective answers
function fillQuestionaire () {
    answerItems.style.display = "inline";
    getQuestionInfo = questions[Object.keys(questions)[questionNumber]];
    questionField.innerHTML =  getQuestionInfo[0];
    for (i = 0; i < answerFields.length; i++) {
        answerFields[i].innerHTML = getQuestionInfo[i + 1];
    }
    questionNumber++;
    setTimeout(clearCorrectWrongArea, 2000);
}

// Logic for the timer
function setTimer () {
    let timerInterval = setInterval(function(){
        if (gameOver === true) {
            clearInterval(timerInterval);
            timerField.textContent = "Time: " + timer;
        } else {
            timer--;
            timerField.textContent = "Time: " + timer;
    
            if(timer === 0) {
                // You Lose Logic
                clearInterval(timerInterval);
            }
        }
    },1000);
}

// Handles when a user clicks on an answer in the multiple choice area.
function handleAnswerClick (event) {
    event.preventDefault();
    var userSelection = event.target;
    userGuess = userSelection.getAttribute("data-number");
    console.log("I clicked " + userSelection.getAttribute("data-number"));
    verifyUserGuess();
    if (questionNumber < 4) {
        fillQuestionaire();
    } else {
        gameEnd();
    }
    
}

// Takes in the user guess and compares it to the correct answer. 
function verifyUserGuess () {
    var correctAnswer = getQuestionInfo[5];
    if(userGuess === correctAnswer) {
        correctWrongArea.innerHTML = "Correct!";
    }else {
        timer = timer - 5;
        correctWrongArea.innerHTML = "Wrong!";
    }
}

// Clears the field displaying the user was correct or wrong on their last guess.
function clearCorrectWrongArea () {
    correctWrongArea.innerHTML = "";
}

// Once the user is done with the quiz they are brought to the game end screen to place their score.
function gameEnd() {
    gameOver = true;
    score = timer;
    questionArea.style.display = "none";
    questionField.innerHTML = "All Done!";
    userScoreField.innerHTML = "Your final score is " + score;
    //Let user enter initials
}




/* Left to do:
- View Highscores top left
- Game end
- top scores screen
- Timer you lose logic and wrong answer deductions
- Actual questions and answers
*/
