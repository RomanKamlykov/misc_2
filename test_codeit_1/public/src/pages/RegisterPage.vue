<template>
  <div class="py-4">
    <form v-on:submit="handleSubmit" class="mx-auto border rounded p-4" method="POST" action="/users/register" autocomplete="off" novalidate>
      <div class="mb-3">
        <label for="email" class="form-label h5">Email</label>
        <input type="email" class="form-control" name="email" id="email" />
      </div>
      <div class="mb-3">
        <label for="login" class="form-label h5">Login</label>
        <input type="text" class="form-control" name="login" id="login" />
      </div>
      <div class="mb-3">
        <label for="real_name" class="form-label h5">Name</label>
        <input type="text" class="form-control" name="real_name" id="real_name" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label h5">Password</label>
        <input type="password" class="form-control" name="password" id="password" />
      </div>
      <div class="mb-3">
        <label for="birth_date" class="form-label h5">Birth date</label>
        <input type="date" class="form-control" name="birth_date" id="birth_date" />
      </div>
      <div class="mb-3">
        <label for="country" class="form-label h5">Country</label>
        <select class="form-select" id="country">
          <option value="">-- Please choose an country --</option>
          <option v-for="country in countries" v-bind:value="country.name" v-bind:key="country.id">{{ country.name }}</option>
        </select>
      </div>
      <div class="mb-4 form-check">
        <input type="checkbox" class="form-check-input" name="is_agree" id="is_agree" />
        <label for="is_agree" class="form-check-label">Agree with terms and conditions</label>
      </div>

      <button type="submit" class="btn btn-primary w-100 mb-3">Sign up</button>
      <div class="text-end">
        <router-link to="/login">Log in →</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      countries: [],
    }
  },
  mounted() {
    this.getCountries();
  },
  methods: {
    async getCountries() {
      try {
        const response = await fetch('/users/register');
        const data = await response.json();
        if (!response.ok) { throw Error(response.statusText); }
        this.countries = data.countries;
      } catch (error) {
        alert('Something went wrong :-(');
      }
    },
    async handleSubmit(e) {
      e.preventDefault();

      const params = {
        email: e.target.elements.email.value,
        login: e.target.elements.login.value,
        real_name: e.target.elements.real_name.value,
        password: e.target.elements.password.value,
        birth_date: e.target.elements.birth_date.value,
        is_agree: e.target.elements.is_agree.checked,
        country: e.target.elements.country.value,
      };

      try {
        const response = await fetch('/users/register', {
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
}
</script>

<style scoped>
  form {
    width: 480px;
  }
  a {
    text-underline-offset: 3px;
  }
</style>
