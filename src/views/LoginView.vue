<template>
  <div class="loginView">
    <div class="loginView__wrapper">
      <component
        :is="loginComponent ? TheLogin : TheRegister"
        @open-login-page="handleOpenLoginPage"
        @open-register-page="handleOpenRegisterPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheLogin from "../app/login/TheLogin.vue";
import TheRegister from "../app/login/TheRegister.vue";

let loginComponent = ref(true);

const handleOpenLoginPage = () => {
  loginComponent.value = true;
};
const handleOpenRegisterPage = () => {
  loginComponent.value = false;
};
</script>

<style scoped>
.loginView {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  margin: 2rem 0;
}
.loginView__wrapper {
  width: 100%;
  max-width: 50%;
  padding: 1rem 1.5rem;
  box-shadow: 0px 1px 3px -1px rgba(0, 0, 0, 0.74);
  background-color: #ece3d5;
}
</style>
