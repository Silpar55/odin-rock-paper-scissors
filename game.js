const options = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return options[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  let playerWon = false;
  let tiedGame = false;

  if (playerChoice.toLowerCase() === computerChoice) {
    tiedGame = true;
    console.log(`Tied! both choose ${playerChoice}`);
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
      console.log(`You win! ${playerChoice} beats ${computerChoice}`);
    } else {
      console.log(`You lose! ${computerChoice} beats ${playerChoice}`);
    }
  }

  return tiedGame ? "tied" : playerWon;
}

function game() {
  let playerCounter = 0;
  let computerCounter = 0;
  let winner = false;

  while (!winner) {
    const playerChoice = prompt(`Choose between: ${options.join(", ")}`);
    if (!playerChoice) return "Choose an option";
    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);

    switch (result) {
      case "tied":
        console.log("nobody won in this round");
        break;
      case true:
        playerCounter++;
        console.log(
          `player won the round (${playerChoice} beats ${computerChoice})`
        );
        break;
      case false:
        computerCounter++;
        console.log(
          `computer won the round(${computerChoice} beats ${playerChoice})`
        );
        break;
    }

    if (playerCounter === 3) {
      winner = true;
      console.log("The player won the game!");
    }

    if (computerCounter === 3) {
      console.log("The computer won the game!");
    }
  }
}

game();
