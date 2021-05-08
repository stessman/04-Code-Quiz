let questions = {
    questionOne : ["Commonly used data types DO NOT include:", "strings", "booleans", "alerts", "numbers", "3"],
    questionTwo : ["The condition in an if / else statement is enclosed within ____.", "quotes", "curly brackets", "parenthesis", "square brackets", "3"],
    questionThree : ["Arrays in JavaScript can be used to store ____.", "numbers and strings", "other arrays", "booleans", "all of the above", "4"],
    questionFour : ["String values must be enclosed within ____ when being assigned to variables.", "commas", "curly brackets", "quotes", "parenthesis", "3"],
    questionFive : ["A very useful tool used during development and debugging for printing content to the debugger is:", "javascript", "terminal/bash", "for loops", "console log", "4"]
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
let initialsForm = document.querySelector("#initialsForm");
let quizHeading = document.querySelector("#quizHeading");
let infoParagraph = document.querySelector("#info");
let submitButton = document.querySelector("#submitButton");
let initialsField = document.querySelector("#initials");
let userInitialsFromField;
let timer;
let userGuess;
let getQuestionInfo;
let score;
let gameOver = false;

startButton.addEventListener("click", init);
answerItems.addEventListener("click", handleAnswerClick);
submitButton.addEventListener("click", newScore);

// Resets the page for a new quiz
function init() {
    startButton.style.display = "none";
    infoParagraph.style.display = "none";
    quizHeading.style.display = "none";
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
                gameEnd();
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
    if (questionNumber < 5) {
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
        timer = timer - 10;
        correctWrongArea.innerHTML = "Wrong!";
    }
}

// Clears the field displaying the user was correct or wrong on their last guess.
function clearCorrectWrongArea () {
    correctWrongArea.innerHTML = "";
}

// Once the user is done with the quiz they are brought to the game end screen to place their score.
function gameEnd() {
    initialsForm.style.display = "inline";
    gameOver = true;
    score = timer;
    questionArea.style.display = "none";
    questionField.innerHTML = "All Done!";
    userScoreField.innerHTML = "Your final score is " + score;
}

//Stores the users initials and score in local storage
function newScore(){
    userInitialsFromField = initialsField.value;
    var user = {
        initials : userInitialsFromField,
        userScore : score
    };
    localStorage.setItem("Highscorer", JSON.stringify(user));
}