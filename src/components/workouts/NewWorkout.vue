<template>
  <a-modal v-model:open="open" title="Create a new workout" @ok="submitForm">
    <div style="display: flex; gap: 1rem; flex-direction: column">
      <a-form
        layout="vertical"
        ref="formRef"
        :model="formState"
        name="new-workout-form"
        autocomplete="off"
      >
        <a-form-item
          label="Workout Name"
          name="name"
          :rules="[
            {
              required: true,
              message: 'Please input a name for your Workout!',
            },
          ]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item
          label="Workout type"
          name="type"
          :rules="[
            { required: true, message: 'Please select the Workout type!' },
          ]"
        >
          <a-radio-group v-model:value="formState.type" button-style="solid">
            <a-radio-button value="standard">Standard</a-radio-button>
            <a-radio-button value="timed">Timed</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(["close-modal"]);

const open = computed({
  get: () => props.open,
  set: () => emit("close-modal", false),
});

const handleOk = (values: any) => {
  emit("close-modal", values);
};

interface FormState {
  name: string;
  type: string;
}

const formState = reactive<FormState>({
  name: "",
  type: "",
});

const formRef = ref<any>(null);

const submitForm = () => {
  if (formRef.value) {
    formRef.value
      .validate()
      .then((values: any) => {
        handleOk(values);
      })
      .catch((errorInfo: any) => {
        console.log("Failed:", errorInfo);
      });
  }
};
</script>
