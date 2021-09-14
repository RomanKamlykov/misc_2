<template>
  <header class="navbar navbar-light bg-light mb-2">
    <div class="container">
      <form action="/add_a_location" method="POST" v-on:submit="addALocation" class="d-flex">
        <input type="text" name="text" id="text" v-model="name" placeholder="Weather in your city" class="form-control me-2">
        <input type="submit" value="Add" class="btn btn-outline-success">
      </form>

      <form action="/change_the_language" method="POST">
        <div class="btn-group btn-group-sm">
          <input class="btn-check" type="radio" name="lang" id="option1" value="EN" v-model="lang">
          <label class="btn btn-outline-success" for="option1">EN</label>
          <input class="btn-check" type="radio" name="lang" id="option2" value="UA" v-model="lang">
          <label class="btn btn-outline-success" for="option2">UA</label>
          <input class="btn-check" type="radio" name="lang" id="option3" value="RU" v-model="lang">
          <label class="btn btn-outline-success" for="option3">RU</label>
        </div>
      </form>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  computed: {
    lang: { // >> string
      get() { return this.$store.state.lang },
      set(lang) { this.$store.dispatch("change_the_language", { lang }) },
    }
  },
  methods: {
    addALocation(e) {
      e.preventDefault();
      if (this.name) this.$store.dispatch('add_a_location_by_name', { name: this.name, lang: this.lang });
    },
  },
}
</script>
