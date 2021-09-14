<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title">{{ location.name }}, {{ location.sys.country }}</h3>

      <ul class="list-unstyled mt-3 mb-4">
        <li>Temperature: {{ location.main.temp }} °C</li>
        <li>Humidity: {{ location.main.humidity }}</li>
        <li>Description: {{ location.weather[0].description }}</li>
        <li>Updated: {{ getDateTime(location.dt * 1000 + location.timezone) }}</li>
      </ul>

      <div class="btn-group">
        <router-link v-bind:to="`/${location.id}`" class="btn btn-primary">Show details →</router-link>
        <input type="button" value="↻" v-on:click="updateTheWeather(location.id)" class="btn btn-secondary">
        <input type="button" value="✕" v-on:click="removeALocation(location.id)" class="btn btn-warning" v-if="isDelete">
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  props: [
    'location', // {}
    'is-delete', // boolean
  ],
  components: {
    'router-link': RouterLink,
  },
  methods: {
    getDateTime(ms) {
      const d = new Date(ms)
      return d.toLocaleTimeString()
    },
    removeALocation(locationId) {
      this.$store.dispatch('remove_a_location_by_id', { locationId })
    },
    updateTheWeather(locationId) {
      this.$store.dispatch('update_the_weather', { locationId })
    },
  },
}
</script>
