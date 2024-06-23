<template>
  <h1>Register</h1>
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
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input v-model:value="formState.password" type="password" />
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
  email: "",
  password: "",
});

const authStore = useAuthStore();

const onFinish = async (values: any) => {
  const response = await authStore.register(values);
  message.success(response);
  router.push({ name: "Login", params: { username: values.username } });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
