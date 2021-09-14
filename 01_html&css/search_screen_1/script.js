document.querySelector(".search-icon").
addEventListener("click", function() {
  document.querySelector(".search-screen").
  classList.add("active");
});

document.querySelector(".close-icon").
addEventListener("click", function() {
  document.querySelector(".search-screen").
  classList.remove("active");
});