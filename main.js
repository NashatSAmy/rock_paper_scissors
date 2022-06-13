// Elements
const buttons = document.querySelectorAll("a");
const winWord = document.querySelector(".win");
const loseWord = document.querySelector(".lose");
const screen = document.querySelector("#screen");
const img = screen.querySelector("img");
const leftSide = document.querySelector("#left-side");
const rightSide = document.querySelector("#right-side");
const body = document.querySelector("body");

// Global variables
let roundNumber = 0;
let playerScore = 0;
let computerScore = 0;

// Function that display the game instructions.
function displayInstructions() {
  const para = document.createElement("p");
  para.innerText = `Welcome stranger are you ready to play a game with the smartest AI to ever exist. 
  If you lose and you will the AI will have access to your mind and control you.
  The game consists of Five rounds whoever gets the best of Five wins.`;
  para.classList.add("text");
  para.id = "para";
  leftSide.appendChild(para);
}

// Function that display the score.
function displayScore() {
  if (rightSide.querySelector("p")) {
    const removedP = rightSide.querySelector("p");
    rightSide.removeChild(removedP);
  }
  const score = document.createElement("p");
  score.classList.add("text");
  score.innerText = `Round ${roundNumber} Your score is ${playerScore} AI score is ${computerScore}`;
  rightSide.appendChild(score);
}

// Function that show the player that he won the round.
function winner() {
  setTimeout(() => winWord.classList.add("win-active"), 2000);
  playerScore++;
}

// Function that show the player that he lost the round.
function loser() {
  setTimeout(() => loseWord.classList.add("lose-active"), 2000);
  computerScore++;
}

// Function that reset all of css during the round play.
function resetRound() {
  winWord.classList.remove("win-active");
  loseWord.classList.remove("lose-active");
  img.src = "";
  buttons.forEach((button) => button.classList.remove("button-active"));
  body.classList.remove("stop");
}

// Function that shows the computer choice.
function showComputerChoice(computerChoice) {
  const wordToNumber = {
    rock: 0,
    paper: 1,
    scissors: 2,
  };
  const srcArray = [
    "./pics/rock-576667.svg",
    "./pics/stick-note-146415.svg",
    "./pics/scissors-23634.svg",
  ];
  const myInterval = setInterval(
    () => (img.src = srcArray[Math.floor(Math.random() * 3)]),
    100
  );
  setTimeout(() => clearInterval(myInterval), 2000);
  setTimeout(() => {
    img.src = srcArray[wordToNumber[computerChoice]];
  }, 2000);
}

// Function that run one round of the game.
function playRound(e) {
  this.classList.add("button-active"); // Showing the button as active.

  //Consts holding the player choice and making the computer choice for the game.
  const optionsArray = ["rock", "paper", "scissors"];
  const playerChoice = this.name;
  const computerChoice = optionsArray[Math.floor(Math.random() * 3)];
  showComputerChoice(computerChoice);

  //Deciding the winner of the round.
  if (playerChoice == computerChoice) winner(), loser(); //draw situation.
  else if (playerChoice == "rock" && computerChoice == "scissors") winner();
  else if (playerChoice == "scissors" && computerChoice == "paper") winner();
  else if (playerChoice == "paper" && computerChoice == "rock") winner();
  else loser();

  setTimeout(() => {
    // Reset the UI
    resetRound();
  }, 3000);
  roundNumber++;
  setTimeout(() => displayScore(), 2000);
  playGame();
}

// Function that start the winning the game effect.
function winnerEffect() {
  body.classList.add("stop");
  leftSide.classList.add("game-winner");
  rightSide.classList.add("game-winner");
  leftSide.firstChild.innerText = "";
  rightSide.firstChild.innerText = "";
  roundNumber = 0;
  playerScore = 0;
  computerScore = 0;
}

// Function that start the losing the game effect.
function loserEffect() {
  body.classList.add("stop");
  leftSide.classList.add("game-loser");
  rightSide.classList.add("game-loser");
  leftSide.firstChild.innerText = "";
  rightSide.firstChild.innerText = "";
  roundNumber = 0;
  playerScore = 0;
  computerScore = 0;
}

// Function that run the full game.
function playGame() {
  if (roundNumber < 5 || playerScore == computerScore) return;
  playerScore > computerScore
    ? setTimeout(() => winnerEffect(), 3300)
    : setTimeout(() => loserEffect(), 3300);
  setTimeout(() => {
    leftSide.classList.remove("game-winner");
    leftSide.classList.remove("game-loser");
    rightSide.classList.remove("game-winner");
    rightSide.classList.remove("game-loser");
    displayInstructions();
    body.classList.remove("stop");
  }, 7300);
}

buttons.forEach((button) => button.addEventListener("click", playRound));
buttons.forEach((button) =>
  button.addEventListener("click", () => body.classList.add("stop"))
);

window.onload = displayInstructions();
