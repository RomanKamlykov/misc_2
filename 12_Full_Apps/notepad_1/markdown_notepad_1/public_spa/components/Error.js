const { RouterLink } = window.VueRouter;

const template = `
  <div class="error">
    <h1>Error</h1>
    <p>{{ error }}</p>
    <router-link to="/home">Home</router-link>
  </div>
`;

function data() {
  return {
    error: '',
  }
}

const components = {
  'router-link': RouterLink,
}

export const Error = { template, data, components }
