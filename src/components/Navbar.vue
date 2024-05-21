<script setup lang="ts">
import { inject } from "vue";
import ThemeToggler from "../components/ThemeToggler.vue";
const toggleTheme = inject("toggleTheme");
const activeTheme = inject("activeTheme");
</script>
<template>
  <div class="navbar">
    <div class="navbar-btns">
      <router-link to="/">
        <a-button shape="round"> Home </a-button>
      </router-link>
      <router-link to="/workouts">
        <a-button shape="round"> Workouts </a-button>
      </router-link>
    </div>
    <ThemeToggler :activeTheme="activeTheme" :toggleTheme="toggleTheme" />
  </div>
</template>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.navbar-btns {
  display: flex;
  gap: 1rem;
}
</style>
