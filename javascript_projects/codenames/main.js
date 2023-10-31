//word list in all CAPS
const endpoint =
  "https://raw.githubusercontent.com/subtlemocha00/codenames/master/words.json";
const dictionary = [];

//websockets
// const WebSocket = require('ws')
// const wss = new WebSocket.Server({
//   port: 8010
// })

//fetches data from json link, parses it with .json() into a proper JSON file, pushes each item to the dictionary array by (...) spreading the data into it
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => dictionary.push(...data));

//Relevant Elements
const cards = document.querySelectorAll(".card");
const cardOverlays = document.querySelectorAll(".cardOverlay");
const ul = document.getElementById("wordList");
const redScore = document.querySelector(".redScore");
const blueScore = document.querySelector(".blueScore");
const wordList = document.getElementById("words");
const roundDisplay = document.querySelector(".round");
const spyButton = document.getElementById("spyButton");
const assassinated = document.querySelector(".assassinated");
const nameInput = document.getElementById("nameInput");
const userNameDisplay = document.getElementById("user-name-display");
const redTeam = document.getElementById("red-players");
const blueTeam = document.getElementById("blue-players");
const endTurnRedBtn = document.querySelector("#endTurnRed");
const endTurnBlueBtn = document.querySelector("#endTurnBlue");
let words = [];
let redWords = [];
let blueWords = [];
let redPoints = 0;
let bluePoints = 0;
let round = 0;

//BUTTONS
const joinRedBtn = document.getElementById("joinRed");
const joinBlueBtn = document.getElementById("joinBlue");

const gameState = {
  gameActive: false,
  spyActive: false,
  turn: "",
  playersRed: [],
  wordsRed: [],
  playersBlue: [],
  wordsBlue: [],
  score: {
    current: {
      red: 0,
      blue: 0,
    },
    rounds: {
      red: 0,
      blue: 0,
    },
  },
  assassin: false,
};

const bluePlayerState = {
  team: "blue",
  turn: false,
};
const redPlayerState = {
  team: "red",
  turn: true,
};

function freshList() {
  //**** UNCOMMENT TO PLAY THE GAME. THIS IS
  // COMMENTED OUT FOR EASE OF DEVELOPMENT****

  // if (gameState.playersRed.length <= 1 || gameState.playersBlue.length <= 1) {
  //   console.log("need more players");
  //   return;
  // }

  gameState.gameActive = true;
  assassinated.style.visibility = "hidden";

  //set the default number of cards per team
  let m = 8;
  let n = 8;

  //bump the round number up by 1 each time NEW GAME is pushed
  round++;
  roundDisplay.textContent = `Round: ${round}`;
  console.log(round);
  if (ul.childElementCount >= 0) {
    ul.innerHTML = "";
  }

  //Event Listeners
  cardOverlays.forEach((card) => card.addEventListener("click", colorReveal));
  cardOverlays.forEach((card) => card.addEventListener("click", score));

  //reset the scores
  redPoints = 0;
  bluePoints = 0;
  redScore.innerHTML = redPoints;
  blueScore.innerHTML = bluePoints;

  //assign an extra card to one team based on whether it is an even numbered round or odd
  round % 2 == 0 ? (n = 9) : (m = 9);

  removeColor();
  genWordList();

  // assign death card first, at random, then red then blue cards (the order isn't important), then assign the rest as neutral
  assignDeath();
  assignRed(m);
  assignBlue(n);
  assignNeutral();
  assignWord();
  startGame();
}

// creates a random number from 0 to dictionary.length-1 [because the index number are 0 to 1 less than the length of the array] and chooses 25 corresponding words to place into words[]
let alreadyChosen = [];
const genWordList = () => {
  words = [];
  for (let i = 0; i < 25; i++) {
    let x = Math.floor(Math.random() * (dictionary.length - 1));
    //ensures each word in the list is an object with a default 'false' color property

    let currentWord = {
      word: dictionary[x],
      color: false,
      revealed: false,
    };

    // if/else checks if the word is already in the list before pushing it to words[] or setting the for() loop back one iteration

    if (alreadyChosen.length >= 399) alreadyChosen = [];
    if (alreadyChosen.includes(x)) {
      i--;
      continue;
    } else {
      words.push(currentWord);
      alreadyChosen.push(x);
      continue;
    }
  }
  // console.log(words); // for debugging
  printList(words); //prints the new list to the document
  return words;
};

//starts the game by finding the color with the most words and changing gameState.turn to that color
const redBar = document.querySelector(".redBar");
const blueBar = document.querySelector(".blueBar");
const startGame = () => {
  //remove the turn indicator if present
  gameState.assassin = false;
  redBar.classList.remove("turnIndicator");
  blueBar.classList.remove("turnIndicator");
  spyUnreveal();
  redWords = words.filter((word) => {
    return word.color === "red";
  });
  blueWords = words.filter((word) => {
    return word.color === "blue";
  });
  if (redWords.length > blueWords.length) {
    gameState.turn = "red";
    redBar.classList.toggle("turnIndicator");
  } else {
    gameState.turn = "blue";
    blueBar.classList.toggle("turnIndicator");
  }
};
const endTurn = () => {
  console.log("end turn");
  blueBar.classList.toggle("turnIndicator");
  redBar.classList.toggle("turnIndicator");
  gameState.turn === "red"
    ? (gameState.turn = "blue")
    : (gameState.turn = "red");
  // return (gameState.isRedTurn = !gameState.isRedTurn);
};

// prints the words to the wordlist

//******** */re-write with a .map() function
function printList(wordList) {
  for (let j = 0; j < wordList.length; j++) {
    let li = document.createElement("li");
    li.textContent = wordList[j].word;
    ul.appendChild(li);
  }
}

// generate a random number, x = 0-25 and make that card black
function assignDeath() {
  let x = Math.floor(Math.random() * 24);
  words[x].color = "black";
  console.log(words[x]);
}

function assignRed(m) {
  // generate a random number, x = 0-25
  for (let i = 0; i < m; i++) {
    let x = Math.floor(Math.random() * 24);
    // check if that word has an assigned color property, if not set .color = red
    // if the word has a color already, reiterate the loop on a different word
    words[x].color === false ? (words[x].color = "red") : i--;
  }
}

// see 'assignRed()' for notes
function assignBlue(n) {
  for (let i = 0; i < n; i++) {
    let x = Math.floor(Math.random() * 24);
    if (words[x].color === false) {
      words[x].color = "blue";
    } else {
      i--;
    }
  }
}

// since blue and red are all assigned, make the rest neutral
function assignNeutral() {
  for (let i = 0; i < words.length; i++) {
    if (words[i].color === false) {
      words[i].color = "neutral";
    }
  }
}

//give all cards a 'data-card-color' property based off the word's colour assignment
function assignWord() {
  for (let i = 0; i < cards.length; i++) {
    let cardContent = document.getElementById("word" + i);
    let currentCard = document.getElementById("card" + i);
    cardContent.textContent = words[i].word;
    currentCard.setAttribute("data-card-color", words[i].color);
  }
}

//strip colours from all cards on resetting the board
function removeColor() {
  for (let i = 0; i < words.length; i++) {
    let currentCard = document.getElementById("card" + i);
    let cardColor = currentCard.getAttribute("data-card-color");
    currentCard.classList.remove(cardColor);
    currentCard.setAttribute("data-card-color", "");
  }
}

// eventListener checks card colours and scores game accordingly
function score() {
  let cardColor = this.getAttribute("data-card-color");
  if (cardColor === "red") {
    redPoints++;
    redScore.innerHTML = redPoints;
    gameState.score.current.red = redPoints;
    console.log("RED: " + redPoints + " vs. BLUE: " + bluePoints);
    this.removeEventListener("click", score);

    if (redPoints === redWords.length) {
      console.log("RED WINS!");
    }
  } else if (cardColor === "blue") {
    bluePoints++;
    blueScore.innerHTML = bluePoints;
    gameState.score.current.blue = bluePoints;
    console.log("RED " + redPoints + " vs. BLUE: " + bluePoints);
    this.removeEventListener("click", score);

    if (bluePoints === blueWords.length) {
      console.log("BLUE WINS!");
    }
  } else {
    console.log("RED " + redPoints + " vs. BLUE: " + bluePoints);
  }
}

function colorReveal() {
  let cardColor = this.getAttribute("data-card-color");
  this.classList.add(cardColor);
  // if (element in words) {
  //   element.word === this.textContent;
  //   console.log("already done");
  // }
  if (cardColor === "black") {
    assassinated.style.visibility = "visible";
    gameState.assassin = true;
    cardOverlays.forEach((card) => card.removeEventListener("click", score));
    if (gameState.turn === "red") {
      gameState.score.rounds.blue++;
      blueWins.innerHTML = `Wins: ${gameState.score.rounds.blue}`;
    } else {
      gameState.score.rounds.red++;
      redWins.innerHTML = `Wins: ${gameState.score.rounds.red}`;
    }
  }
  if (cardColor != gameState.turn && cardColor != "black") {
    console.log(cardColor, gameState.turn);
    endTurn();
  }
}
const crossOffWord = () => {};
const displayWords = () => {
  console.log("wordList visibility toggled");
  wordList.classList.toggle("visible");
};
// a function that reveals all cards to the spy masters
const spyReveal = () => {
  gameState.spyActive = !gameState.spyActive;
  console.log("spy mode activated");
  spyButton.addEventListener("click", spyUnreveal);
  spyButton.removeEventListener("click", spyReveal);
  cardOverlays.forEach((card) => {
    let cardColor = card.getAttribute("data-card-color");
    if (!card.classList.contains(cardColor)) {
      card.classList.add(cardColor);
    }
    card.removeEventListener("click", score);
    card.removeEventListener("click", colorReveal);
  });
};
const guessCountdown = () => {};
const spyUnreveal = () => {
  spyButton.addEventListener("click", spyReveal);
  spyButton.removeEventListener("click", spyUnreveal);
  // if (!gameState.spyActive) {
  cardOverlays.forEach((card) => {
    let cardColor = card.getAttribute("data-card-color");
    if (card.classList.contains(cardColor)) {
      card.classList.remove(cardColor);
    }
    // card.classList.toggle(cardColor);
    card.addEventListener("click", score);
    card.addEventListener("click", colorReveal);
  });
  // }
};
const joinRed = () => {
  const redTeamMembers = [];
  let userName = nameInput.value;
  redTeamMembers.push({
    id: new Date().getTime(),
    name: userName,
    team: "red",
  });
  gameState.playersRed.push({
    id: new Date().getTime(),
    name: userName,
    team: "red",
  });
  console.log("Bonjour, bienvenue a l'equipe rouge, " + userName);
  redTeamMembers.map((member) => {
    const li = document.createElement("li");
    li.textContent = member.name;
    redTeam.appendChild(li);
  });
  nameInput.value = "";
};
const joinBlue = () => {
  const blueTeamMembers = [];
  let userName = nameInput.value;
  blueTeamMembers.push({
    id: new Date().getTime(),
    name: userName,
    team: "blue",
  });
  gameState.playersBlue.push({
    id: new Date().getTime(),
    name: userName,
    team: "blue",
  });
  console.log("Bonjour, bienvenue a l'equipe bleu, " + userName);
  blueTeamMembers.map((member) => {
    const li = document.createElement("li");
    li.textContent = member.name;
    blueTeam.appendChild(li);
  });
  nameInput.value = "";
};
joinRedBtn.addEventListener("click", joinRed);
joinBlueBtn.addEventListener("click", joinBlue);
endTurnRedBtn.addEventListener("click", endTurn);
endTurnBlueBtn.addEventListener("click", endTurn);
spyButton.addEventListener("click", spyReveal());
//   }
// });
// to assign the correct colours to the cards...
// cards.forEach((function() {
//
// });

//STEPS
// 1) get an array of 25 words at random from the json
//  -) access json
//  -) randomly create an array of 25 integers (0 to '1 - json.length')
//  -) select the words at those positions and save in the same array

// 2) assign the words each to tile
//  -) use the array to iterate words into tiles

// 3) give card properties (red/blue/black/neutral) to the tiles
//  -) figure out game board patterns and assign to an array
//  -) combine game board properties with word array

// 5) evaluate choice, return results
//  -) the array properties will be checked at each tile selection event for true:false to determine outcome

// 4) indicate who plays first and initiate turn
