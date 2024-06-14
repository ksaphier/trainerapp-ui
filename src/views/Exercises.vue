<template>
  <Navbar title="Exercises" :backIcon="false">
    <a-button
      type="primary"
      :icon="h(PlusOutlined)"
      @click="() => (openNew = true)"
      >New</a-button
    >
  </Navbar>
</template>
<script lang="ts" setup>
import { h, ref } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

import Navbar from "../components/global/Navbar.vue";

const openNew = ref(false);
</script>
