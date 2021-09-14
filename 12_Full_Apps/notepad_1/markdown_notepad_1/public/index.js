netlifyIdentity.on('login', () => { window.location.href = "/home"; });
if (localStorage.getItem('gotrue.user') !== null) {
  window.location.href = "/home";
}
