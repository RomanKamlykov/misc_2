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