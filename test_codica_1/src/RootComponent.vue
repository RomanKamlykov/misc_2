<template>
  <router-view />
</template>

<script>
  import { RouterView } from 'vue-router'

  export default {
    components: {
      'router-view': RouterView
    },
    mounted() {
      this.$store.dispatch('set_the_language')
    },
  }
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
