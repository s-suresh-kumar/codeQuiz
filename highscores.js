// constant that query DOM API to establish a variable to access HTML
const highScoresList = document.getElementById("highScoresList");
// Retrieve the stringified highScores list from localStorage JSON object
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//const that query DOM API to establish a vaiable to access HTML
const clear_high_scores = document.getElementById("clear_high_scores");

//Populate the high score ul with list items in the HTML
highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li style="background:mediumpurple; " class="high-score">${score.name} - ${score.score}</li>`;
  })

  .join("");
// add "click" event listener
// and if clicked clear local storage
clear_high_scores.addEventListener("click", (e) => {
  console.log("clear high scores");
  window.localStorage.clear();
});
