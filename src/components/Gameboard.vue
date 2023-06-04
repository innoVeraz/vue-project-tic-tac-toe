<script setup lang="ts">
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import Button from "./Button.vue";

const emits = defineEmits<{
  (e: "makemove", index: number, board: Board): void;
  (e: "resetgame"): void;
}>();

const props = defineProps<{
  currentPlayer: Player;
  board: Board;
}>();

const handleCellClick = (index: number) => {
  if (props.board[index] !== "") {
    return;
  }
  props.board[index] = props.currentPlayer?.symbol;
  console.log(props.currentPlayer);
  emits("makemove", index, props.board);
};

const resetGame = () => {
  emits("resetgame");
};
</script>

<template>
  <div>
    <h2>
      Players turn: {{ currentPlayer?.name }} ( {{ currentPlayer?.symbol }} )
    </h2>
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
  </div>
  <Button @click="resetGame"> Reset Game </Button>
</template>

<style scoped lang="scss">
h2 {
  padding: 2em;
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
Button {
  margin-top: 1em;
}
</style>
