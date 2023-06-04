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
  <div class="headlines">
    <h1>
      TiC TaC ToE <span><img src="../assets/tictactoe.svg" alt="" /></span>
    </h1>
    <h2>Welcome players!</h2>
  </div>
  <div class="wrapper">
    <form @submit.prevent="startGame">
      <div>
        <label>Player {{ props.player1.symbol }} Name:</label>
        <input type="text" v-model="props.player1.name" />
      </div>
      <div>
        <br />
        <label> Player {{ props.player2.symbol }} Name: </label>
        <input type="text" v-model="props.player2.name" />
      </div>
      <br />
      <Button>Start Game</Button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.headlines {
  display: flex;
  flex-direction: column;
  gap: 3em;
  padding: 2em;

  h1 {
    font-size: 3em;
  }
}

label {
  font-size: 1.2em;
}

input {
  font-size: 1.2em;
  text-align: center;
  border-radius: 0.3em;
  border: 1px solid grey;

  margin-left: 1em;
  padding: 0.2em;
}

Button {
  margin-top: 2em;
}
</style>
