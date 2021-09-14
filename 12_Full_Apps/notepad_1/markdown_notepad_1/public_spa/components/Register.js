const { RouterLink } = window.VueRouter;

const template = `
  <div class="register">
    <h1>Register</h1>
    <form action="/register" method="POST" v-on:submit="submitRegister">
      <div>
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <router-link to="/login">Login</router-link>
  </div>
`;

const components = {
  'router-link': RouterLink,
}

const methods = {
  async submitRegister(e) {
    e.preventDefault();
    console.log(123);
  }
}

export const Register = { template, components, methods }
