<template>
  <a-modal v-model:open="open" title="Add an exercise" @ok="submitForm">
    <div style="display: flex; gap: 1rem; flex-direction: column">
      <a-radio-group v-model:value="filters" button-style="solid">
        <a-radio-button value="any">Any</a-radio-button>
        <a-radio-button value="upper">Upper</a-radio-button>
        <a-radio-button value="lower">Lower</a-radio-button>
      </a-radio-group>
      <a-form
        layout="vertical"
        ref="formRef"
        :model="formState"
        name="add-exercise-form"
        autocomplete="off"
      >
        <a-form-item
          label="Exercise"
          name="exerciseId"
          :rules="[
            {
              required: true,
              message: 'Please select an Exercise!',
            },
          ]"
        >
          <a-select
            v-model:value="formState.exerciseId"
            :options="exercisesListFiltered"
            :field-names="{ label: 'name', value: 'id' }"
          ></a-select>
        </a-form-item>
        <div class="container">
          <a-form-item
            label="Series"
            name="series"
            :rules="[
              {
                required: true,
                message: 'This is required!',
              },
            ]"
          >
            <a-input-number
              id="series"
              v-model:value="formState.series"
              :min="1"
              :max="10"
            />
          </a-form-item>
          <a-form-item
            label="Reps"
            name="reps"
            :rules="[
              {
                required: true,
                message: 'This is required!',
              },
            ]"
          >
            <a-input-number
              id="reps"
              v-model:value="formState.reps"
              :min="1"
              :max="100"
            />
          </a-form-item>
          <a-form-item
            label="Rest"
            name="rest"
            :rules="[
              {
                required: true,
                message: 'This is required!',
              },
            ]"
          >
            <a-input-number
              id="rest"
              v-model:value="formState.rest"
              :min="1"
              :max="300"
            />
          </a-form-item>
          <a-form-item
            label="Weight"
            name="weight"
            :rules="[
              {
                required: true,
                message: 'This is required!',
              },
            ]"
          >
            <a-input-number
              id="weight"
              v-model:value="formState.weight"
              :min="1"
              :max="300"
            />
          </a-form-item>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watch, onMounted } from "vue";
import { useExercisesStore } from "../../stores/exercisesStore";

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

const filters = ref<string>("any");

const formState = reactive({
  exerciseId: "",
  series: 4,
  reps: 8,
  rest: 60,
  weight: 0,
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

const store = useExercisesStore();

onMounted(() => {
  if (open.value) store.fetchExercises();
});

const exercisesList = computed(() => store.exercises);

const exercisesListFiltered = computed(() => {
  return filters.value === "any"
    ? exercisesList.value
    : exercisesList.value.filter((exercise) =>
        exercise.focus?.includes(filters.value)
      );
});

watch(
  () => open.value,
  () => {
    formState.exerciseId = "";
    formState.series = 4;
    formState.reps = 8;
    formState.rest = 60;
    formState.weight = 0;
  }
);
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.ant-input-number-in-form-item {
  width: 100%;
}
</style>
