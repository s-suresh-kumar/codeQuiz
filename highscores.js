const highScoresList = document.getElementById("highScoresList");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const clear_high_scores = document.getElementById("clear_high_scores");

highScoresList.innerHTML = highScores

    .map(score => {

    return `<li style="background:mediumpurple; " class="high-score">${score.name} - ${score.score}</li>`;

})

.join("");


clear_high_scores.addEventListener("click", e => {

    console.log('clear high scores');
    window.localStorage.clear();

});

function goBack() {
    window.history.back();
  }