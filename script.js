document.querySelector('.rockBtn').addEventListener('click',() => playGame('rock'));
document.querySelector('.paperBtn').addEventListener('click',() => playGame('paper'));
document.querySelector('.scissorsBtn').addEventListener('click',() =>playGame('scissors'));

document.body.addEventListener('keydown',(event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('rock');
    } else if (event.key === 'p' || event.key === 'P') {
        playGame('paper');
    } else if (event.key === 's' || event.key === 'S') {
        playGame('scissors');
    }
});

const score = JSON.parse(localStorage.getItem("score")) || {
    Wins: 0,
    Losses: 0,
    Ties: 0,
};

document.querySelector('.score').innerText = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;

function resetScore() {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector('.result').innerText = '';
    document.querySelector('.move').innerHTML = '';
    document.querySelector('.score').innerText = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function playGame(playerMove) {
    const computerChoice = pickComputerMove();

    let result;

    if (playerMove === "rock") {
        if (computerChoice === "rock") {
            result = "Tie.";
            score.Ties += 1;
        } else if (computerChoice === "paper") {
            result = "Computer wins.";
            score.Losses += 1;
        } else {
            result = "You win.";
            score.Wins += 1;
        }
    } else if (playerMove === "paper") {
        if (computerChoice === "rock") {
            result = "You win.";
            score.Wins += 1;
        } else if (computerChoice === "paper") {
            result = "Tie.";
            score.Ties += 1;
        } else {
            result = "Computer wins.";
            score.Losses += 1;
        }
    } else {
        if (computerChoice === "rock") {
            result = "Computer wins.";
            score.Losses += 1;
        } else if (computerChoice === "paper") {
            result = "You win.";
            score.Wins += 1;
        } else {
            result = "Tie.";
            score.Ties += 1;
        }
    }

    localStorage.setItem("score", JSON.stringify(score));

    document.querySelector('.result').innerText = `${result}`;
    document.querySelector('.move').innerHTML = `You<img class="choiceImg" src="./Icons/${playerMove}-emoji.png" alt="Rock" /><img class="choiceImg" src="./Icons/${computerChoice}-emoji.png" alt="Rock" />Computer `;
    document.querySelector('.score').innerText = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
} 

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerChoice;

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerChoice = "rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }

    return computerChoice;
}

let isAutoPlaying = false;
let intervalId

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => playGame(pickComputerMove()), 1000);
        isAutoPlaying = true;
        document.querySelector('.autoPlayBtn').innerText = 'Stop Play';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.autoPlayBtn').innerText = 'Auto Play';
    }
}