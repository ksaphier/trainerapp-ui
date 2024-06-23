<template>
  <div class="dropdown-container">
    <a-dropdown
      :open="visible"
      @openChange="handleVisibleChange"
      trigger="click"
      placement="topLeft"
      overlay-class="overlay"
    >
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a-button
              shape="round"
              size="large"
              type="primary"
              @click="authStore.logout"
              style="width: 100%"
            >
              <LogoutOutlined style="font-size: x-large" />
            </a-button>
          </a-menu-item>
          <a-menu-item>
            <ThemeToggler
              :activeTheme="activeTheme"
              :toggleTheme="toggleTheme"
            />
          </a-menu-item>
          <a-menu-item>
            <router-link to="/" @click.native="handleClick"> Home </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/workouts" @click.native="handleClick">
              Workouts
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link to="/exercises" @click.native="handleClick">
              Exercises
            </router-link>
          </a-menu-item>
        </a-menu>
      </template>
      <a-button
        class="dropdown-button"
        shape="circle"
        @click="visible = !visible"
      >
        <MenuOutlined v-if="visible" />
        <MoreOutlined v-else />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import {
  MenuOutlined,
  MoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import ThemeToggler from "./ThemeToggler.vue";
import { useAuthStore } from "../../stores/authStore";

const toggleTheme = inject("toggleTheme");
const activeTheme = inject("activeTheme");

const visible = ref(false);

const handleVisibleChange = (val: boolean) => {
  visible.value = val;
};

const handleClick = (event: { preventDefault: () => void }) => {
  event.preventDefault();
};

const authStore = useAuthStore();
</script>

<style scoped>
.dropdown-container {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 1000;
}

/* class to make the button bigger */
.dropdown-button {
  font-size: 1.5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--text-color);
  color: var(--back-color);
  border-color: var(--text-color);
}

.dropdown-button:hover {
  background-color: var(--back-color);
  color: var(--text-color);
}

.ant-dropdown-menu-title-content > a {
  font-size: 1.2rem;
  margin: 0.5rem;
}
</style>
