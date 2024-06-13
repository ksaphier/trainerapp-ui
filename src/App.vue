<template>
  <a-config-provider :theme="antTheme">
    <router-view />
    <MenuApp />
  </a-config-provider>
</template>

<script setup lang="ts">
import { provide } from "vue";
import MenuApp from "./components/global/MenuApp.vue";
import { antTheme, toggleTheme, activeTheme } from "./theme";

provide("activeTheme", activeTheme);
provide("toggleTheme", toggleTheme);
</script>

<style scoped></style>
