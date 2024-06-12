import { computed, ref } from "vue";
import { theme } from "ant-design-vue";

const lightTheme = {
  token: {
    colorPrimary: "rgb(28, 28, 28)",
  },
  algorithm: theme.defaultAlgorithm,
};

const darkTheme = {
  token: {
    colorPrimary: "rgb(232, 232, 232)",
  },
  algorithm: theme.darkAlgorithm,
};

const antTheme = ref(darkTheme);

const activeTheme = computed(() => {
  return antTheme.value.algorithm === theme.defaultAlgorithm;
});

const toggleTheme = () => {
  if (antTheme.value.algorithm === theme.defaultAlgorithm) {
    antTheme.value = darkTheme;
    document.body.className = "dark-theme";
  } else {
    antTheme.value = lightTheme;
    document.body.className = "light-theme";
  }
};

export { antTheme, toggleTheme, activeTheme };
