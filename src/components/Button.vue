<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  font-size: 1.5em;
  background-color: var(--primary);
  color: var(--dark);
  width: 10em;
  margin: auto;
  border-radius: 0.5em;

  padding: 0.4em;

  &:hover {
    background-color: var(--primary-alt);
  }
}
</style>
