addEventListener("DOMContentLoaded", (e) => {
  const options = ["rock", "paper", "scissors"];
  let playerCounter = 0;
  let computerCounter = 0;
  let winner = false;
  const content = document.querySelector("#content");
  const result = document.createElement("div");
  const counters = document.createElement("div");
  const playerP = document.createElement("p");
  const playerSpan = document.createElement("span");
  const computerP = document.createElement("p");
  const computerSpan = document.createElement("span");
  const winnerP = document.createElement("p");
  const restart = document.createElement("button");

  playerP.innerText = "Player: ";
  playerSpan.innerText = playerCounter;
  computerP.innerText = "Computer: ";
  computerSpan.innerText = computerCounter;
  restart.innerText = "Restart Game";

  result.classList.add("result");
  counters.classList.add("counters");
  winnerP.classList.add("winner");
  restart.classList.add("restart");
  content.append(result);
  content.append(counters);
  counters.append(playerP);
  counters.append(computerP);
  playerP.append(playerSpan);
  computerP.append(computerSpan);
  function getComputerChoice() {
    return options[Math.floor(Math.random() * 3)];
  }

  function playRound(playerChoice, computerChoice) {
    let playerWon = false;
    let tiedGame = false;
    const p = document.createElement("p");
    if (playerChoice.toLowerCase() === computerChoice) {
      tiedGame = true;
      p.innerText = `Tied in this round! both choose ${playerChoice}`;
    } else {
      switch (playerChoice.toLowerCase()) {
        case "rock":
          if (computerChoice === "scissors") playerWon = true;
          break;
        case "paper":
          if (computerChoice === "rock") playerWon = true;
          break;
        case "scissors":
          if (computerChoice === "paper") playerWon = true;
          break;
      }

      if (playerWon) {
        p.innerText = `You win this round! ${playerChoice} beats ${computerChoice}`;
      } else {
        p.innerText = `You lose this round! ${computerChoice} beats ${playerChoice}`;
      }
    }

    result.append(p);
    return tiedGame ? "tied" : playerWon;
  }

  // Get all button options
  const optionsContent = document.querySelectorAll("div.options button");

  function disableButtons() {
    optionsContent.forEach(function (option) {
      option.setAttribute("disabled", "");
      option.classList.add("disabled");
    });
  }

  // Create a event listener to each one to get the player choice base on the value and play the round
  optionsContent.forEach(function (option) {
    option.addEventListener("click", () => {
      let playerOption = option.value;
      let computerOption = getComputerChoice();
      // clear the previous result
      while (result.firstChild) result.removeChild(result.lastChild);
      const resultRound = playRound(playerOption, computerOption);

      switch (resultRound) {
        case true:
          playerCounter++;
          break;
        case false:
          computerCounter++;
          break;
      }

      if (playerCounter === 3) {
        winner = true;
        winnerP.innerText = "The player won the game!";
        result.append(winnerP);
      }

      if (computerCounter === 3) {
        winner = true;
        winnerP.innerText = "The computer won the game!";
        result.append(winnerP);
      }

      playerSpan.innerText = playerCounter;
      computerSpan.innerText = computerCounter;

      // If there is a winner, disable the buttons and create a restar button
      if (winner) {
        disableButtons();
        result.append(restart);
      }
    });

    restart.addEventListener("click", (e) => {
      location.reload();
    });
  });
});
