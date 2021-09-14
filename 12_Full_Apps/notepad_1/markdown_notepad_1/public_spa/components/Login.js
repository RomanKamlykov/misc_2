const { RouterLink } = window.VueRouter;

const template = `
  <div class="login">
    <h1>Login</h1>
    <form action="/login" method="POST" v-on:submit="submitLogin">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <router-link to="/register">Register</router-link>
  </div>
`;

const components = {
  'router-link': RouterLink,
}

const methods = {
  async submitLogin(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;

    const response = await fetch('/.netlify/functions/pageLoginPost', {
      method: "POST", 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('auth-token', token);
      this.$router.push('/home');
    }
  },
}

export const Login = { template, components, methods }
