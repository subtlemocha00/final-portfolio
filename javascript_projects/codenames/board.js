const gameBoard = document.getElementById("gameBoard");

generateBoard();

function generateBoard() {
  for (let i = 0; i <= 24; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <span id="card${i}" class="cardOverlay">
        <span id="word${i}" class="word"></span>
      </span>`;
    gameBoard.appendChild(card);
  }
}

const rules = [
  '1. Divide the players into two teams: the "red" team and the "blue" team.One player from each team becomes the team\'s "spymaster.',
  " 2. Shuffle the deck of word cards and place them on the game board so that each card is visible to all players. The game board consists of a 5x5 grid of cards, and each card has a word printed on it.",
  "3. Choose one of the two spymasters to go first. The spymasters take turns giving one-word clues to their teammates, trying to get them to guess as many of their team's words as possible.",
  ' 4. When giving a clue, the spymaster must also indicate how many cards are associated with that clue. For example, if the clue is "fruit," and there are three cards on the board that are associated with the red team and the clue "fruit," the spymaster would say "fruit - 3."',
  ' 5. The other players on the team then try to guess which cards are associated with the clue. They can guess one card at a time, and the spymaster must confirm whether the card belongs to their team or not. If the card belongs to the other team, the turn passes to the other spymaster. If the card is a "neutral" card (not associated with either team), the turn also passes to the other spymaster.',
  " 6. The game continues in this manner until one team has successfully guessed all of their cards, or until all of the cards have been guessed and it is clear that neither team will win.",
];

rules.forEach((rule) => console.log(rule));
