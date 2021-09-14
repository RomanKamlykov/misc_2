let el = document.querySelector('#logo')
let myAnimation = new LazyLinePainter(el, {
  strokeColor: '#cc2d8a',
  strokeWidth: 2,
  ease: 'easeInOutExpo'
});
el.addEventListener('click', paint, false);

function paint() {
  myAnimation.paint();
}

paint();