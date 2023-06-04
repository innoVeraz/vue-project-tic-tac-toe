<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <div class="app">
    <Sidebar />
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --primary: #39f1eb;
  --primary-alt: #2ecdc5;
  --grey: #6a9494;
  --dark: #264651;
  --dark-alt: #44798a;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira sans", sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    margin: auto;
    max-width: 640px;
    text-align: center;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
