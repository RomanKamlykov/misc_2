const header = document.querySelector("header");
const sectionOne = document.querySelector(".home-intro");
const sectionOneObserver = new IntersectionObserver(
  //callback function
  function(entries, sectionOneObserver) {
    entries.forEach(entry => {
      (entry.isIntersecting) ? header.classList.remove("nav-scrolled") : header.classList.add("nav-scrolled");
    });
  },
  //options object
  {
    rootMargin: "-110px 0px 0px 0px"
  }
)
sectionOneObserver.observe(sectionOne);


const faders = document.querySelectorAll(".fade-in");
const appearOnScroll = new IntersectionObserver(
  //callback function
  function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  //options object
  {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
  }
)
faders.forEach(fader => appearOnScroll.observe(fader));

const sliders = document.querySelectorAll(".slide-in");
sliders.forEach(slider => appearOnScroll.observe(slider));