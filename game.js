const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const timerText = document.getElementById("timer");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const vhsLink = document.getElementById("vhsLink");
const resultDiv = document.getElementById("result-container");
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let sec = 75;
let timer;

function setTime() {
  console.log("INSIDE SET TIME", sec);
  timer = setInterval(function () {
    console.log("INSIDE SET INTERVAL", sec);
    sec--;
    document.getElementById("timer").innerHTML = "Time: " + "00:" + sec;
    if (sec === 0) {
      clearInterval(timer);
      alert("Time is up!");
    }
  }, 1000);
}

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
    Answer: 3,
  },
  {
    question:
      "Which of the following function of String object causes a string to be italic, as if it were in an <i> tag?",
    choice1: "fixed()",
    choice2: "fontcolor()",
    choice3: "fontsize()",
    choice4: "italics()",
    Answer: 4,
  },
];

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", sec);
    //go to the end page
    return window.location.assign("end.html");
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
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

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const audioElement = document.createElement("audio");
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
      audioElement.setAttribute("src", "Assets/sounds/correct_answer_beep.wav");
      audioElement.play();
    } else {
      sec -= 10;
      audioElement.setAttribute("src", "Assets/sounds/wrong_answer_beep.wav");
      audioElement.play();
      if (sec < 0) {
        clearInterval(timer);
        alert("Time is up!");
      }
    }

    selectedChoice.parentElement.classList.add(classToApply);
    str = classToApply + "!";
    str = str.fontsize("3");
    str = str.bold();
    resultDiv.innerHTML = `${`<br/><hr /><br/>` + str}`;

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      resultDiv.innerHTML = "";
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  // scoreText.innerText = score;
};
