<template>
  <a-page-header
    class="navbar"
    style="border: 1px solid rgb(235, 237, 240)"
    :title="title"
    :sub-title="subTitle"
    @back="goBack"
  >
    <template #extra>
      <slot />
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps({
  title: String,
  subTitle: String,
});

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.ant-page-header {
  border: 1px solid transparent !important;
}
</style>
