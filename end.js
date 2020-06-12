// constants that query the DOM and set up variables with values
const final_score = document.getElementById("final_score");
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
// constants that query localStorage and get values to be displayed in end.html
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const farewellMsg = localStorage.getItem("farewellMsg");
//constant to hold maximum high scores
const MAX_HIGH_SCORES = 5;

// The following intimates the user of whether clock ran out or the user finished in time and scored more than zero. This was first set in game.js in localStorage. Now retrieved from localStorage to show the user.
finalScore.innerText = farewellMsg;

//Similarly from localStorage, the user's score is retrieved and presented
final_score.innerText = final_score.innerText =
  "Your final score is: " + mostRecentScore;

// setup user to enter Initials
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Process user intials and store
saveHighScore = (e) => {
  console.log("clicked the save button!");
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  //push the latest user + score  to local storage
  highScores.push(score);
  //sort the entries in localStorage
  highScores.sort((a, b) => b.score - a.score);
  //Only retain top 5 socres, discard extra
  highScores.splice(5);

  //finally store them in localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  //Load the highscores.html now
  window.location.assign("highscores.html");
};
