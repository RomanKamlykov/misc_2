const bgColor = window.getComputedStyle(document.documentElement).getPropertyValue('--div-bg-color');
console.log(bgColor);

document.getElementById('dark-theme-btn').addEventListener('click', () => {
  document.documentElement.style.setProperty('--bg-color', '#333');
});

document.getElementById('light-theme-btn').addEventListener('click', () => {
  document.documentElement.style.setProperty('--bg-color', '#FFF');
});
