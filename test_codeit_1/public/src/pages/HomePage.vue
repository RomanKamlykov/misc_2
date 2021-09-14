<template>
  <div>
      <nav class="navbar navbar-light bg-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">Home</router-link>
          <div class="d-flex">
            <span class="navbar-text me-2">{{ name }}, {{ email }}</span>
            <button v-on:click="logout" class="btn btn-outline-secondary">Logout</button>
          </div>
        </div>
      </nav>
      <main>
        <div class="container py-3">
          <article v-for="post in posts" v-bind:key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </article>
        </div>
      </main>
    </div>
</template>

<script>
export default {
  data() {
    return {
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      posts: [],
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        const token = localStorage.getItem('auth-token');
        const response = await fetch('/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) { throw Error(response.statusText); }
        const data = await response.json();
        this.posts = data.posts;
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('auth-token');
      this.isLogedIn = false;
      this.$router.push('/login');
    },
  },
};
</script>
