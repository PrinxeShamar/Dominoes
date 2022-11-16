function GenerateBoard() {
  let board = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      board.push(`${i}${j}`)
    }
  }
  return board;
}

function GenerateRandomBoard() {
  let board = GenerateBoard();
  let currentIndex = board.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [board[currentIndex], board[randomIndex]] = [board[randomIndex], board[currentIndex]];
  }
  return board;
}

function GenerateHands(board, numHands) {
  let hands = [];
  for (let i = 0; i < numHands; i++) {
    hands.push([]);
  }
  for (let i = 0; i < board.length; i++) {
    let handIndex = i % numHands;
    hands[handIndex].push(board[i]);
  }
  return hands;
}

module.exports = {GenerateBoard, GenerateRandomBoard, GenerateHands}