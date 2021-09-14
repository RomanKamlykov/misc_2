const { RouterLink } = VueRouter;

const template = `
  <div class="login">
    <h1>Login</h1>
    <form action="/login" method="POST">
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
    <a href="/register">Register</a>
  </div>
`;

function data() {
  return {
    childPosts: [],
    recentPosts: []
  }
}

async function mounted() {
  // const response = await fetch('/api/home');
  // const data = await response.json();
  // this.childPosts = data.childPosts;
  // this.recentPosts = data.recentPosts;
  console.log(123);
}

const components = {
  'router-link': RouterLink,
}

const methods = {
  reverseMessage() {
    this.message = this.message.split('').reverse().join('')
  }
}

export const Search = { template, data, mounted, components, methods }
