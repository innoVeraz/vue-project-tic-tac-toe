<script setup lang="ts">
import { Player } from "../models/Player";
import Button from "./Button.vue";

const emits = defineEmits<{ (e: "startgame"): void }>();

const props = defineProps<{ player1: Player; player2: Player }>();

const startGame = () => {
  emits("startgame");
};
</script>

<template>
  <form @submit.prevent="startGame">
    <h3>Players names here:</h3>
    <div>
      <label>Player {{ props.player1.symbol }} Name:</label>
      <input type="text" v-model="props.player1.name" />
    </div>
    <div>
      <br />
      <label>Player {{ props.player2.symbol }} Name:</label>
      <input type="text" v-model="props.player2.name" />
    </div>
    <br />
    <Button>Start Game</Button>
  </form>
</template>

<style scoped lang="scss">
input {
  height: 2em;
  border-radius: 0.5em;
  border: 1px solid grey;
  margin-left: 1em;
  margin-top: 1em;
  padding: 1em;
}
</style>
