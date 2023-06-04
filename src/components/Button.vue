<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  background-color: var(--grey);
  color: var(--light);
  border: 1px solid var(--grey);
  padding: 1em;
  border-radius: 0.5em;

  &:hover {
    background-color: var(--primary-alt);
  }
}
</style>
