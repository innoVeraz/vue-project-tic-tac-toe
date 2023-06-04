<script setup lang="ts">
import Button from "./Button.vue";

const emits = defineEmits<{ (e: "playagain"): void }>();

const props = defineProps<{ winner: string }>();

const playAgain = () => {
  emits("playagain");
};
</script>

<template>
  <h3>Game Over!</h3>
  <p>Winner: {{ props.winner }}</p>

  <Button @click="playAgain"> Play again </Button>
</template>

<style scoped lang="scss"></style>
