const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));

//const progressText = document.getElementById("progressText");

//const scoreText = document.getElementById("score");

const timerText = document.getElementById("timer");

//const progressBarFull = document.getElementById("progressBarFull");

const loader = document.getElementById("loader");

const game = document.getElementById("game");

const vhsLink = document.getElementById("vhsLink")

const resultDiv = document.getElementById("result-container")

let currentQuestion = {};

let acceptingAnswers = false;

let score = 0;

let questionCounter = 0;

let availableQuesions = [];



//let questions = [];

var sec = 75;
var timer;

function setTime() {
    console.log('INSIDE SET TIME', sec);
  timer = setInterval(function() {
    console.log('INSIDE SET INTERVAL', sec);
    sec--;
   // timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";
   document.getElementById('timer').innerHTML = 'Time: ' +'00:' + sec;
    if(sec === 0) {
      clearInterval(timer);
      alert("Time is up!")
      //sendMessage();
    }

  }, 1000);
};
/*
 let questions = [{
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "2. How to empty an array in JavaScript?",
    choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
    correctAnswer: 2
}, {
    question: "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}]; */
 questions = [
    {

        question: "How do you write 'Hello World' in an alert box?",

        choice1: "msgBox('Hello World');",

        choice2: "alertBox('Hello World');",

        choice3: "msg('Hello World');",

        choice4: "alert('Hello World');",

        answer: 4

    },

    {

        question: "Which of the following is not a reserved word in JavaScript?",

        choice1: "interface",

        choice2: "throws",

        choice3: "program",

        choice4: "short",

        answer: 3

    },

    {

        question: "JavaScript is a ___ -side programming language",

        choice1: "Client",

        choice2: "Server",

        choice3: "Both",

        choice4: "None",

        answer: 3

    },


    {

        question: "What will the code return? Boolean (3 < 7)",

        choice1: "true",

        choice2: "false",

        choice3: "NaN",

        choice4: "SyntaxError",

        answer: 1

    },


    {

        question: "Which JavaScript label catches all the values, except for the ones specified?",

        choice1: "catch",

        choice2: "label",

        choice3: "try",

        choice4: "default",

        answer: 4

    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",

        choice1: "last()",
        choice2: "get()",
        choice3: "pop()",
        choice4: "None of the above",
    
        Answer: 3
    },
    {
        question: "Which of the following function of String object causes a string to be italic, as if it were in an <i> tag?",
    
        choice1: "fixed()",
        choice2: "fontcolor()",
        choice3: "fontsize()",
        choice4: "italics()",
    
        Answer: 4
    }

 ];

// fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
// .then(res => {
//     return res.json();
// })
// .then(loadedQuestions => {
//     console.log(loadedQuestions.results);
//      questions = loadedQuestions.results.map(loadedQuestion => {
//          const formattedQuestion = { question: loadedQuestion.question };
//          const answerChoices = [...loadedQuestion.incorrect_answers];
        
//        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
//          answerChoices.splice( formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
//         answerChoices.forEach((choice, index) => { formattedQuestion["choice" + (index + 1)] = choice; });
//                  return formattedQuestion;
//      });
     
     
//      console.log(questions);

//      startGame();
//      setTime();
//  }).catch(err => { console.error(err); });

 //questions = require('questions.json');

 
//  [
//      {
//         question: "What is the capital of Illinois",
//         answer: 3,
//         choice1: "Albany",
//         choice2: "Miami",
//         choice3: "Springfield",
//         choice4: "Baltimore"
//      },
//      {
//         question: "What is the capital of Illinois",
//         answer: 3,
//         choice1: "Albany",
//         choice2: "Miami",
//         choice3: "Springfield",
//         choice4: "Baltimore"
//      }
//  ]

//startGame();
//setTime();
// function init() {
//     import questions from ('./questions.json');
// }
// //questions = require('./questions.json');
// init();

/*
var secondsLeft = 10;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
} */

//CONSTANTS

const CORRECT_BONUS = 10;

const MAX_QUESTIONS = 3;
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



    choices.forEach(choice => {

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

    document.getElementById('timer').innerHTML = 'Time: ' +'00:' + sec;

    game.classList.remove("hidden");

    loader.classList.add("hidden");

};
console.log("got here")
startGame();
setTime();
/*
var mydiv = document.getElementById("myDiv");
var aTag = document.createElement('a');
aTag.setAttribute('href',"yourlink.htm");
aTag.innerText = "link text";
mydiv.appendChild(aTag);

vhsLink = document.createElement('a');
vhsLink.setAttribute('href',"highscores.html");
vhsLink.innerText = "View High Scores";
*/

function createVHSLink() {


    // Create anchor element. 
    let a = document.createElement('a');

    // Create the text node for anchor element. 

    let link = document.createTextNode("View High Scores");

    // Append the text node to anchor element. 
    a.appendChild(link);

    // Set the title. 
    /* a.title = "This is Link"; */

    // Set the href property. 
    a.href = "highscores.html";

    // Append the anchor element to the body. 
    //document.body.appendChild(a);
    return a;
}

// getNewQuestion = () => {

//     if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {

//         localStorage.setItem("mostRecentScore", sec);

//         //go to the end page

//         return window.location.assign("end.html");

//     }

//     questionCounter++;

//     const questionIndex = Math.floor(Math.random() * availableQuesions.length);

//     currentQuestion = availableQuesions[questionIndex];

//     question.innerHTML = currentQuestion.question;



//     choices.forEach(choice => {

//         const number = choice.dataset["number"];

//         choice.innerHTML = currentQuestion["choice" + number];

//     });



//     availableQuesions.splice(questionIndex, 1);

//     acceptingAnswers = true;

// };



choices.forEach(choice => {

    choice.addEventListener("click", e => {

        if (!acceptingAnswers) return;



        acceptingAnswers = false;

        const selectedChoice = e.target;

        const selectedAnswer = selectedChoice.dataset["number"];



        const classToApply =

            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";



        if (classToApply === "correct") {

            incrementScore(CORRECT_BONUS);

        } else {
            
            sec -= 10;
            if (sec < 0) {
                clearInterval(timer);
                
                alert("Time is up!")
                
            } /*
            else {
                document.getElementById('timer').innerHTML = 'Time: '+'00:' + sec;
                //startTimer();
            } */
        }



        selectedChoice.parentElement.classList.add(classToApply);
        str = classToApply + "!";
        str=str.fontsize("3");
        
        str=str.bold();
        
      // resultDiv.innerHTML='<br/><hr style="height:5px; color:grey";><br/>' + ' <p style="font-size:18px; font-weight:bold">  classToApply + "!"</p>';
      resultDiv.innerHTML=`${`<br/><hr /><br/>` + str }`;
     //resultDiv.write('<br/>');
     
     //resultDiv.innerHTML.write(<hr style="font-weight:bold"/>);

            
                setTimeout(() => {

                    selectedChoice.parentElement.classList.remove(classToApply);
                    resultDiv.innerHTML="";

                    getNewQuestion();

                }, 1000);


/*
        (function() {


            function startTimer() {
                console.log('INSIDE START TIMER', sec);
                selectedChoice.parentElement.classList.remove(classToApply);

                getNewQuestion();
                console.log('timer suppose to go')
                timer = setInterval(function() {
                    sec--;
                    document.getElementById('timer').innerHTML = 'Time: ' +'00:' + sec;
                    if (sec < 0) {
                        clearInterval(timer);
                        alert("Time is up!")
                    }
                }, 1000);
            }
            startTimer();
        })(); 

    }); */

});
});
/*
(function() {


    function startTimer() {
        console.log('timer suppose to go')
        var timer = setInterval(function() {
            sec--;
            document.getElementById('timer').innerHTML = '00:' + sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
            }
        }, 1000);
    }
    /* document.getElementById('incorrect').addEventListener('click', function() {
         sec -= 5;
         document.getElementById('timer').innerHTML = '00:' + sec;
     }); */
/*
    //startTimer();
})();
*/
incrementScore = num => {

    score += num;

   // scoreText.innerText = score;

}