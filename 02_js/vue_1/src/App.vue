<template>
  <div id="app">
    <Header />
    <Carousel />
    <Bestsellers />
    <Updates />
    <Seo />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Seo from './components/Seo.vue'
import Footer from './components/Footer.vue'
import Carousel from './components/Carousel.vue'
import Bestsellers from './components/Bestsellers.vue'
import Updates from './components/Updates.vue'

export default {
  name: 'App',
  components: {
    Header,
    Carousel,
    Bestsellers,
    Updates,
    Seo,
    Footer
  }
}
</script>
<style lang="scss" src="./App.scss"></style>