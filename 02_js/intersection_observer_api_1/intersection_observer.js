// const sectionOne = document.querySelector(".section1");
const sections = document.querySelectorAll(".section");
const callback = function(entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
    // (entry.isIntersecting) ? entry.target.classList.add("inverse") : entry.target.classList.remove("inverse") // добавляет/удаляет класс
    
    if (entry.isIntersecting) { // добавляет класс и удаляет обработчик
      entry.target.classList.add("inverse");
      observer.unobserve(entry.target);
    }
  });
}
const options = {
  root: null,
  threshold: 0,
  rootMargin: "-250px"
};
const observer = new IntersectionObserver((entries, observer) => callback(entries, observer), options);
// observer.observe(sectionOne);
sections.forEach(section => observer.observe(section));