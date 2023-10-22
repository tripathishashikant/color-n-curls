<template>
  <nav class="navigation">
    <div class="navigation__logo">
      <TheLogo />
    </div>
    <div class="navigation__links">
      <router-link to="/login" class="navigation__link navigation__link--login">
        {{ loginLinkTitle }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { LOGIN } from "../../constants/pages";
import TheLogo from "./TheLogo.vue";

const loginLinkTitle = LOGIN.TITLE;
</script>

<style scoped>
.navigation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  padding: 0 0 0 1.5rem;
}
.navigation__link {
  display: inline-block;
  padding: 1rem 1.5rem;
  font-size: 1.6rem;
  color: white;
  text-decoration: none;
}
.navigation__link:hover,
.navigation__link--active {
  background-color: orange;
}
.navigation__link--user {
  position: relative;
}
.navigation__link--user:hover .navigation__dropdown {
  display: block;
}

.navigation__dropdown {
  display: none;
  position: absolute;
  top: 100%;
  right: 0.5rem;
  background-color: white;
}
.navigation__dropdown ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.navigation__dropdown li {
  padding: 1rem;
  color: black;
  cursor: pointer;
  box-shadow: 0 0 3px 0 black;
}

.navigation__logo {
  flex: 0 1 20rem;
}
</style>
