<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";
import PlayerSelect from "./PlayerSelect.vue";

let winner: any = null;

const board = Array(9).fill("");
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

type State = {
  player1: Player;
  player2: Player;
  currentPlayer?: Player;
  gameState: "player select" | "in progress" | "game over";
};

const state = ref<State>({
  player1: new Player("", "X"),
  player2: new Player("", "O"),
  gameState: "player select",
});

const startGame = () => {
  if (state.value.player1.name === "" || state.value.player2.name === "") {
    return alert("fill in name");
  }
  state.value.gameState = "in progress";
  state.value.currentPlayer = state.value.player1;
};

const makeMove = (index: number) => {
  if (board[index] !== "") {
    return;
  }
  board[index] = state.value.currentPlayer?.symbol;
  winner = checkWinner();
  if (winner) {
    state.value.gameState = "game over";
    return;
  }
  state.value.currentPlayer =
    state.value.currentPlayer?.symbol === state.value.player1.symbol
      ? state.value.player2
      : state.value.player1;
};

const checkWinner = () => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (!board.includes("")) {
    return "Draw";
  }
  return null;
};

const resetGame = () => {};
</script>

<template>
  <PlayerSelect
    v-if="state.gameState === 'player select'"
    :player1="state.player1"
    :player2="state.player2"
    @startgame="startGame"
  ></PlayerSelect>

  <div v-else-if="state.gameState === 'in progress'">
    <h3>
      Current Player: {{ state.currentPlayer?.name }} ({{
        state.currentPlayer?.symbol
      }})
    </h3>
    <div class="board">
      <div
        class="cell"
        v-for="(cell, index) in board"
        :key="index"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>
    <div class="game-buttons-container">
      <button class="reset-current-game-btn" @click="resetCurrentGame">
        Reset current game
      </button>
      <button @click="playAgain">Play again</button>
      <button class="get-score-board-btn" @click="getScoreBoard">
        Get Score
      </button>
    </div>
  </div>

  <div v-else-if="state.gameState === 'game over'">
    <h3>Game Over!</h3>
    <p>Winner: {{ winner }}</p>
  </div>

  <div></div>
</template>

<style scoped lang="scss">
.form {
  margin-top: 4em;

  h3 {
    padding: 1em;
  }
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 5px;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  height: 4em;
  font-size: 36px;
}
.game-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 1em;

  margin-top: 1em;
}
</style>
