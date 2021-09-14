const images = document.querySelectorAll("[data-src]"); //выбираем только элементы с атрибутом data-src
const preloadImage = function(img) {
  const src = img.getAttribute("data-src");
  if (src) img.src = src;
}
const imgObserver = new IntersectionObserver(
  //callback function
  function(entries, imgObserver) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        imgObserver.unobserve(entry.target);
      }
    });
  },
  //options object
  {
    //threshold: 1,
    rootMargin: "0px 0px 300px 0px"
  }
)
images.forEach(image => imgObserver.observe(image));