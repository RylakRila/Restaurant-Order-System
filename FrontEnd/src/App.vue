<template>
  <div id="app">
    <router-link :to="{name: 'Login'}">
      <h3>Group 1 - Restaurant Order System </h3>
    </router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.test {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 50px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
