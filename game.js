// const variables that point to HTML elements in game.html
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const timerText = document.getElementById("timer");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const vhsLink = document.getElementById("vhsLink");
const resultDiv = document.getElementById("result-container");

//app constant that holds the max questions
const MAX_QUESTIONS = 4;

// app variable declarations that don't remain constant
let currentQuestion = {};
let acceptingAnswers = false;
let questionCounter = 0;
let availableQuesions = [];

// count down timer related app variables
let sec = 75;
let timer;

//This function runs the count down timer as soon as the game starts every one second, it displays updated timer value. If the timer value reaches zero, game is ended and the app loads  end.html
function setTime() {
  //Actual javascript timer call with anonymous function to be executed at
  //every 1000 milliseconds
  timer = setInterval(function () {
    //decrement the timer value (sec) every 1000 millisec
    sec--;
    //update the timer display on game.html
    document.getElementById("timer").innerHTML = "Time: " + "00:" + sec;
    //the timer value , sec could become -ve due to 10 sec penalty to wrong answers. We do not want to show -ve score to user. Make it 0 if less than 0
    if (sec < 0) sec = 0;

    //If the user exhausted timescore and reached zero, end the game and load end.htmlAlso load his score as mostRecentScore in localStorage. Store the message to be displayed in end.html
    if (sec === 0) {
      localStorage.setItem("mostRecentScore", sec);
      localStorage.setItem("farewellMsg", "Clock Ran Out! Try Again");
      //go to the end page
      return window.location.assign("end.html");
    }
  }, 1000);
}
// The following holds questions, answer choices in questions array
const questions = [
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    choice1: "interface",
    choice2: "throws",
    choice3: "program",
    choice4: "short",
    answer: 3,
  },
  {
    question: "JavaScript is a ___ -side programming language",
    choice1: "Client",
    choice2: "Server",
    choice3: "Both",
    choice4: "None",
    answer: 3,
  },
  {
    question: "What will the code return? Boolean (3 < 7)",
    choice1: "true",
    choice2: "false",
    choice3: "NaN",
    choice4: "SyntaxError",
    answer: 1,
  },
  {
    question:
      "Which JavaScript label catches all the values, except for the ones specified?",
    choice1: "catch",
    choice2: "label",
    choice3: "try",
    choice4: "default",
    answer: 4,
  },
  {
    question:
      "Which built-in method removes the last element from an array and returns that element?",
    choice1: "last()",
    choice2: "get()",
    choice3: "pop()",
    choice4: "None of the above",
    answer: 3,
  },
  {
    question:
      "Which of the following function of String object causes a string to be italic, as if it were in an <i> tag?",
    choice1: "fixed()",
    choice2: "fontcolor()",
    choice3: "fontsize()",
    choice4: "italics()",
    answer: 4,
  },
];

//This function gets a new question at the start of game and at the end of every question for which user has already chose an answer
getNewQuestion = () => {
  //Look to see if the game has ended. It can end if no remaining questions to be asked Or time ran out
  if (
    availableQuesions.length === 0 ||
    questionCounter >= MAX_QUESTIONS ||
    sec < 1
  ) {
    //Make sure time is not -ve
    if (sec < 0) sec = 0;
    //Store the score and final message in local storage
    localStorage.setItem("mostRecentScore", sec);
    localStorage.setItem("farewellMsg", "Great Job");
    //go to the end page
    return window.location.assign("end.html");
  }

  //access the next question in a random fashion from the array. Present it to the user by writing it to the HTML
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;
  // Get the answer choices of the question and present them to the user by writing to innerHTML
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//This is where the game is started when game.js is loaded
startGame = () => {
  //Initialize questionCounter, availableQuestion
  questionCounter = 0;
  availableQuesions = [...questions];
  //Get a new question and present it with answer choices
  getNewQuestion();
  //update the DOM to show countdown timer with current value
  document.getElementById("timer").innerHTML = "Time: " + "00:" + sec;

  game.classList.remove("hidden");
  loader.classList.add("hidden");
};
console.log("got here");
startGame();
setTime();

function createVHSLink() {
  // Create anchor element.
  let a = document.createElement("a");

  // Create the text node for anchor element.
  let link = document.createTextNode("View High Scores");

  // Append the text node to anchor element.
  a.appendChild(link);

  // Set the href property.
  a.href = "highscores.html";
  return a;
}

//attach EventListeners and process user's answer
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const audioElement = document.createElement("audio");
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    let resultStr;
    //If the user selected correct answer, play a distinct correct answer audio.
    if (classToApply === "correct") {
      audioElement.setAttribute("src", "Assets/sounds/correct_answer_beep.wav");
      audioElement.play();
      resultStr = "Correct!";
    } else {
      //for wrong answers penalize the user with 10 timerscore seconds and play a distinct incorrect answer audio
      sec -= 10;
      audioElement.setAttribute("src", "Assets/sounds/wrong_answer_beep.wav");
      audioElement.play();
      resultStr = "Incorrect!";
    }

    // prepare 'incorrect!' or 'correct!' text and horizontal rule to be presented for 1 sec to notify user of correct/incorrect answer. Also red/green background is applied to selected answer choice and remains applied for a second.

    selectedChoice.parentElement.classList.add(classToApply);

    resultStr = resultStr.fontsize("3");
    resultStr = resultStr.bold();
    resultDiv.innerHTML = `${`<br/><hr /><br/>` + resultStr}`;

    //The following runs a 1 second timer and at the end of the second green/red background is removed. The 'horizontal rule', 'correct!', 'incorrect!' texts are removed with "" (blank); Finally a new question selection is initated by calling getNewQuestion.
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      resultDiv.innerHTML = "";
      getNewQuestion();
    }, 1000);
  });
});
