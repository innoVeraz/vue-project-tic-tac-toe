<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Player } from "../models/Player";
import PlayerSelect from "./PlayerSelect.vue";
import Gameboard from "./Gameboard.vue";
import { Board } from "../models/Board";
import GameOver from "./GameOver.vue";

type GameState = "player select" | "in progress" | "game over";

let board: Board = Array(9).fill("");

const player1 = ref<Player>(new Player("", "X", 0));
const player2 = ref<Player>(new Player("", "O", 0));
const currentPlayer = ref<Player>();
const gameState = ref<GameState>("player select");

let winner: any = null;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

const startGame = () => {
  if (player1.value.name === "" || player2.value.name === "") {
    return alert("fill in name");
  }
  gameState.value = "in progress";
  currentPlayer.value = player1.value;
  saveGame();
};

const makeMove = (index: number, board: Board) => {
  winner = checkWinner(board);
  if (winner) {
    updateScores();
    gameState.value = "game over";
    return;
  }
  currentPlayer.value =
    currentPlayer.value?.symbol === player1.value.symbol
      ? player2.value
      : player1.value;
  saveGame();
};

const checkWinner = (board: Board) => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      const winningSymbol = board[a];
      if (winningSymbol === player1.value.symbol) {
        return player1.value.name;
      }
      return player2.value.name;
    }
  }
  if (!board.includes("")) {
    return "It's a draw, try again!";
  }
  return null;
};

const updateScores = () => {
  if (winner === player1.value.name) {
    player1.value.points++;
  } else if (winner === player2.value.name) {
    player2.value.points++;
  }
};

const playAgain = () => {
  board = Array(9).fill("");
  gameState.value = "in progress";
};

const resetGame = () => {
  player1.value = new Player("", "X", 0);
  player2.value = new Player("", "O", 0);
  currentPlayer.value = undefined;
  gameState.value = "player select";
  board = Array(9).fill("");

  localStorage.removeItem("game");
};

onMounted(() => {
  const savedGameState = localStorage.getItem("game");
  if (savedGameState) {
    const savedData = JSON.parse(savedGameState);
    player1.value = savedData.player1;
    player2.value = savedData.player2;
    board = savedData.board;
    currentPlayer.value = savedData.currentPlayer;
    gameState.value = savedData.gameState;
  }
});

const saveGame = () => {
  const gameData = {
    player1: player1.value,
    player2: player2.value,
    currentPlayer: currentPlayer.value,
    gameState: gameState.value,
    board: board,
  };
  localStorage.setItem("game", JSON.stringify(gameData));
};
</script>

<template>
  <PlayerSelect
    v-if="gameState === 'player select'"
    :player1="player1"
    :player2="player2"
    @startgame="startGame"
  ></PlayerSelect>

  <Gameboard
    v-else-if="gameState === 'in progress' && currentPlayer"
    :current-player="currentPlayer"
    :board="board"
    @makemove="makeMove"
    @resetgame="resetGame"
  ></Gameboard>

  <GameOver
    v-else-if="gameState === 'game over'"
    :player1="player1"
    :player2="player2"
    :winner="winner"
    @playagain="playAgain"
  >
  </GameOver>
</template>

<style scoped lang="scss"></style>
