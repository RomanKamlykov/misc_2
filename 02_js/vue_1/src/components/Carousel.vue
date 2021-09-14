<template>
  <section class="сarousel" @mouseover="isPaused=true" @mouseleave="isPaused=false">
    <div class="сarousel-container">
      <div class="carousel-item fade">
        <img src="https://via.placeholder.com/1200x400/a6c5ad/ffffff?text=First+item" />
      </div>

      <div class="carousel-item fade">
        <img src="https://via.placeholder.com/1200x400/c1dfbe/ffffff?text=Second+item" />
      </div>

      <div class="carousel-item fade">
        <img src="https://via.placeholder.com/1200x400/eddacc/ffffff?text=Third+item" />
      </div>

      <div class="carousel-item fade">
        <img src="https://via.placeholder.com/1200x400/61a4b2/ffffff?text=Fourth+item" />
      </div>
    </div>

    <div class="carousel-indicators">
      <span class="dot" @click="currentSlide(1)"></span>
      <span class="dot" @click="currentSlide(2)"></span>
      <span class="dot" @click="currentSlide(3)"></span>
      <span class="dot" @click="currentSlide(4)"></span>
    </div>

    <div class="carousel-control prev" @click="plusSlides(-1)">
      <span>&#10094;</span>
    </div>
    
    <div class="carousel-control next" @click="plusSlides(1)">
      <span>&#10095;</span>
    </div>
  </section>
</template>
<script src="./Carousel.js"></script>
<style lang="scss" src="./Carousel.scss"></style>