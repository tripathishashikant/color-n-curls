<template>
  <div class="login">
    <div class="login__wrapper">
      <h2 class="login__title">{{ LOGIN.TITLE }}</h2>
      <div class="login__errorWrapper">
        <p v-if="isInvalidUser" class="login__error error__ribbon">
          {{ ERRORS.INVALID_USER }}
        </p>
        <p v-if="isfetchUserError" class="login__error error__ribbon">
          {{ ERRORS.SERVICE_UNAVAILABLE }}
        </p>
      </div>
      <div class="login__formWrapper">
        <form class="login__form">
          <label
            class="login__label login__label--name"
            title="Enter username here"
            for="loginUserName"
          >
            <input
              id="loginUserName"
              class="login__input login__input--name"
              type="text"
              placeholder="Enter username"
              v-model="loginData.name"
            />
          </label>
          <label
            class="login__label login__label--password"
            title="Enter password here"
            for="loginPassword"
          >
            <input
              id="loginPassword"
              class="login__input login__input--password"
              type="password"
              placeholder="Enter password"
              v-model="loginData.password"
            />
          </label>
          <div class="login__btnWrapper">
            <button class="login__btn" @click.prevent="onSubmit">
              {{ LOGIN.TITLE }}
            </button>
            <p class="login__registerTitle">
              {{ LOGIN.REGISTER_LINK_TITLE }}
              <a class="login__registerLink" @click="$emit('openRegisterPage')">
                {{ LOGIN.REGISTER_LINK_SUB_TITLE }}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, watch, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { LOGIN, ERRORS } from "../../constants/pages";

defineEmits(["openRegisterPage"]);

const store = useStore();
const router = useRouter();

const loginData = {
  name: null,
  password: null,
};

const isInvalidUser = computed(() => store.getters["loginStore/isInvalidUser"]);
const isfetchUserError = computed(
  () => store.getters["loginStore/isfetchUserError"]
);

watch(
  () => store.getters["loginStore/redirectTo"],
  (newValue) => {
    router.push(newValue);
  }
);

const onSubmit = () => {
  store.dispatch("loginStore/login", loginData);
};
</script>

<style scoped>
.login__title {
  text-align: center;
}
.login__formWrapper {
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.login__form {
  display: block;
  width: 70%;
  margin: 0 auto;
}
.login__label {
  display: block;
  padding: 1rem 0;
}
.login__input {
  width: 100%;
}
.login__btnWrapper {
  padding-bottom: 2rem;
  text-align: center;
}
.login__btn {
  display: inline-block;
}
.login__error {
  margin-top: 1rem;
}

.login__registerLink {
  cursor: pointer;
}
</style>
