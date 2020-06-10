const final_score = document.getElementById("final_score");
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const farewellMsg = localStorage.getItem("farewellMsg");
const MAX_HIGH_SCORES = 5;

finalScore.innerText = farewellMsg;
final_score.innerText = final_score.innerText =
  "Your final score is: " + mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("clicked the save button!");
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: username.value,
  };

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("highscores.html");
};
