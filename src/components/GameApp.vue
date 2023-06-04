<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import PlayerSelect from "./PlayerSelect.vue";
import Gameboard from "./Gameboard.vue";
import { Board } from "../models/Board";
import GameOver from "./GameOver.vue";

type GameState = "player select" | "in progress" | "game over";

let board: Board = Array(9).fill("");

const player1 = ref<Player>(new Player("", "X"));
const player2 = ref<Player>(new Player("", "O"));
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
};

const makeMove = (index: number, board: Board) => {
  winner = checkWinner(board);
  if (winner) {
    gameState.value = "game over";
    return;
  }
  currentPlayer.value =
    currentPlayer.value?.symbol === player1.value.symbol
      ? player2.value
      : player1.value;
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
    return "Draw";
  }
  return null;
};

const playAgain = () => {
  board = Array(9).fill("");
  gameState.value = "in progress";
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
  ></Gameboard>

  <GameOver
    v-else-if="gameState === 'game over'"
    :winner="winner"
    @playagain="playAgain"
  >
  </GameOver>
</template>

<style scoped lang="scss"></style>
