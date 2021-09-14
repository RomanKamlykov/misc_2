export default {
  name: 'Carousel',
  data: function () {
    return {
      slideIndex: 1, //selected item
      isPaused: false //flag, pauses setInterval
    }
  },
  methods: {
    // https://www.w3schools.com/howto/howto_js_slideshow.asp
    plusSlides: function (n) { //for arrows
      this.showSlides(this.slideIndex += n);
    },
    currentSlide: function (n) { //for dots
      this.showSlides(this.slideIndex = n);
    },
    showSlides: function (n) {
      var i;
      var slides = document.getElementsByClassName("carousel-item");
      var dots = document.getElementsByClassName("dot");

      if (n > slides.length) { this.slideIndex = 1 } //sets first item
      if (n < 1) { this.slideIndex = slides.length } //sets last item

      for (i = 0; i < slides.length; i++) { //hides all items
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) { //deactivates all dots
        dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[this.slideIndex - 1].style.display = "block"; //shows selected item
      dots[this.slideIndex - 1].className += " active"; //activates selected dot
    }
  },
  mounted: function () {
    this.showSlides(this.slideIndex); //shows first slide
    window.setInterval(() => this.isPaused || this.plusSlides(+1), 2000); //setInterval => plusSlides if isPaused == false
  }
}