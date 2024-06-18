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
          label="Name"
          name="name"
          :rules="[
            {
              required: true,
              message: 'Please input a name for the exercise!',
            },
          ]"
        >
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <!-- description -->
        <a-form-item
          label="Description"
          name="description"
          :rules="[
            {
              required: true,
              message: 'Please input a description for the exercise!',
            },
          ]"
        >
          <a-input v-model:value="formState.description" />
        </a-form-item>

        <a-form-item
          label="Focus"
          name="focus"
          :rules="[{ required: true, message: 'Select the focus!' }]"
        >
          <a-checkbox-group
            v-model:value="formState.focus"
            button-style="solid"
          >
            <a-checkbox value="lower">Lower</a-checkbox>
            <a-checkbox value="upper">Upper</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";

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
  description: string;
  focus: string[];
}

const formState = reactive<FormState>({
  name: "",
  description: "",
  focus: [],
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

watch(
  () => open.value,
  () => {
    formState.name = "";
    formState.description = "";
    formState.focus = [];
  }
);
</script>
