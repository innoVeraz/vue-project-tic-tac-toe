<script setup lang="ts">
const props = defineProps<{ winner: string }>();
</script>

<template>
  <div>
    <h3>Game Over!</h3>
    <p>Winner: {{ props.winner }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
