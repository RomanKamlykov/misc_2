function parallax(event) {
  this.querySelectorAll('.layer').forEach(layer => {
    let speed = layer.getAttribute('data-speed');
    layer.style.transform = `translateX(${event.clientX*speed/100}px)`;
  });
}

document.addEventListener('mousemove', parallax);