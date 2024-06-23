<template>
  <h1>Login</h1>
  <a-form
    layout="vertical"
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "../stores/authStore";
import { message } from "ant-design-vue";
import router from "../routes/router";

const formState = reactive({
  username: "",
  password: "",
});

const authStore = useAuthStore();

const onFinish = async (values: any) => {
  await authStore.login(values);
  if (authStore.accessToken) {
    message.success("Login successful");
    router.push({ name: "Home" });
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
