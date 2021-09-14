<template>
  <my-header />

  <main>
    <div class="container" v-if="currentLocation.length">
      <h3 class="mb-3">Current location</h3>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3 mb-3">
        <div class="col">
          <my-card v-bind:location="currentLocation[0]" v-bind:is-delete="false" />
        </div>
    </div>
    </div>

    <div class="container" v-if="sortedSavedLocations.length">
      <h3 class="mb-3">Saved locations</h3>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-3 mb-3">
        <div v-for="location in sortedSavedLocations" v-bind:key="location.id" class="col">
          <my-card v-bind:location="location" v-bind:is-delete="true" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import Card from './Card.vue'
  import Header from './Header.vue'

  export default {
    components: {
      'my-card': Card,
      'my-header': Header,
    },
    mounted() {
      if (!this.currentLocation.length) this.$store.dispatch('get_current_location_by_coordinates')
      if (!this.sortedSavedLocations.length) this.$store.dispatch('get_saved_locations')
    },
    computed: {
      currentLocation() { // >> []
        return this.$store.state.currentLocation
      },
      sortedSavedLocations() { // >> []
        const arr = [...this.$store.state.savedLocations]
        return arr.sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
      },
    },
  }
</script>
