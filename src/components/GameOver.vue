<script setup lang="ts">
import { Player } from "../models/Player";
import Button from "./Button.vue";

const emits = defineEmits<{ (e: "playagain"): void }>();

const props = defineProps<{
  winner: string;
  player1: Player;
  player2: Player;
}>();

const playAgain = () => {
  emits("playagain");
};
</script>

<template>
  <div class="wrapper">
    <h1>Game Over!</h1>
    <h2 class="winner-text">
      Gongrats {{ props.winner }}! You won this round!
    </h2>
    <h3>
      {{ props.player1.name }}: <span>{{ props.player1.points }} points</span>
    </h3>
    <h3>
      {{ props.player2.name }}: <span>{{ props.player2.points }} points</span>
    </h3>

    <Button @click="playAgain"> Play again </Button>
    <Button @click="scoreboard"> Scoreboard </Button>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2em;

  h1 {
    color: goldenrod;
  }

  .winner-text {
    color: var(--primary);

    font-weight: 700;
  }

  Button {
    margin: auto;
  }
}
</style>
