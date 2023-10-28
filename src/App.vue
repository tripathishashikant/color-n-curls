<template>
  <div class="app">
    <header class="app__header header">
      <TheNav />
    </header>
    <main id="mainContent" class="app__module module">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheNav from "./app/shared/TheNav";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

@import url("./assets/css/errors.css");

@import url("./assets/css/info.css");
</style>

<style>
* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  line-height: 1.2;
}

body {
  margin: 0;
  padding: 0;
  font-size: 1.6rem;
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  background-color: lightgray;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: orangered;
}

a:hover {
  color: orange;
}

input {
  padding: 0.7rem 1rem 0.5rem;
  border-radius: 3px;
  border: 2px solid darkgray;
  background: transparent;
}

button {
  padding: 0.7rem 1rem 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  border-radius: 3px;
  border: 1px solid transparent;
  background: orangered;
  cursor: pointer;
}

button:hover {
  background: orange;
}

.header {
  min-height: 3.9rem;
  background-color: orangered;
}

.app__module {
  padding: 0 1.5rem;
}
</style>
