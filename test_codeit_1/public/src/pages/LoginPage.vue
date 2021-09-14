<template>
  <div class="py-4">
    <form v-on:submit="handleSubmit" class="mx-auto border rounded p-4" method="POST" action="/users/login" autocomplete="off" novalidate>
      <div class="mb-3">
        <label for="login" class="form-label h5">Login or Email</label>
        <input type="text" class="form-control" name="login" id="login" />
      </div>
      <div class="mb-4">
        <label for="password" class="form-label h5">Password</label>
        <input type="password" class="form-control" name="password" id="password" />
      </div>
      <button type="submit" class="btn btn-primary w-100 mb-3">Log in</button>
      <div class="text-end">
        <router-link to="/register">Sign up →</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      const params = {
        login: e.target.elements.login.value,
        password: e.target.elements.password.value,
      };

      try {
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });
        const data = await response.json();

        if (!response.ok) {
          if (data.message) return alert(data.message);
          throw Error(response.statusText);
        }

        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('auth-token', data.token);
        this.$router.push('/');
      } catch (error) {
        alert('Something went wrong :-(');
      }
    },
  },
};
</script>

<style scoped>
  form {
    width: 320px;
  }
  a {
    text-underline-offset: 3px;
  }
</style>
