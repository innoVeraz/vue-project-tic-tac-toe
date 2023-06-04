<script setup lang="ts">
import { Board } from "../models/Board";
import { Player } from "../models/Player";

const emits = defineEmits<{
  (e: "makemove", index: number, board: Board): void;
}>();

const props = defineProps<{ currentPlayer: Player }>();

const board: Board = Array(9).fill("");

const handleCellClick = (index: number) => {
  if (board[index] !== "") {
    return;
  }
  board[index] = props.currentPlayer?.symbol;
  emits("makemove", index, board);
};
</script>

<template>
  <div>
    <h3>
      Current Player: {{ props.currentPlayer?.name }} ({{
        props.currentPlayer?.symbol
      }})
    </h3>
    <div class="board">
      <div
        class="cell"
        v-for="(cell, index) in board"
        :key="index"
        @click="handleCellClick(index)"
      >
        {{ cell }}
      </div>
    </div>
    <!-- <div class="game-buttons-container">
      <button class="reset-current-game-btn" @click="resetCurrentGame">
        Reset current game
      </button>
      <button @click="playAgain">Play again</button>
      <button class="get-score-board-btn" @click="getScoreBoard">
        Get Score
      </button>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
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
