<template>
  <header class="navbar navbar-light bg-light mb-3">
    <div class="container">
      <router-link to="/" class="btn btn-primary">← Back</router-link>
    </div>
  </header>
  <main class="container">
    <h1 class="mb-3">{{ location.name }}, {{ location.sys?.country }}</h1>
    <p>Last update {{ getDateTime(location.dt * 1000 + location.timezone) }}</p>
    <div class="d-flex border border-3 my-class">
      <div v-for="hour in hourlyForecastLast8Hours" v-bind:key="hour.dt" class="flex-fill position-relative">
        <div 
          class="text-center rounded border border-light position-absolute w-100" 
          v-bind:style="`bottom:${getBottomLengthByTemp(hour.temp)}%;background-color:${getColorByTemp(hour.temp)}`"
        >
          {{ (hour.temp>0) ? ('+'+hour.temp) : (hour.temp) }}
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div v-for="(hour, index) in hourlyForecastLast8Hours" v-bind:key="hour.dt" class="flex-fill text-center">
        {{ (index === 0) ? 'now' : getDateTime2(hour.dt * 1000) }}
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  mounted() {
    this.$store.dispatch('get_hourly_forecast', { locationId: this.$route.params.id })
  },
  components: {
    'router-link': RouterLink,
  },
  computed: {
    minMax() { // >> {}
      const minTemp = Math.min(...this.hourlyForecastLast8Hours.map(el => el.temp))
      const maxTemp = Math.max(...this.hourlyForecastLast8Hours.map(el => el.temp))
      return { minTemp, maxTemp }
    },
    location() { // >> {}
      return this.$store.state.detailsLocation
    },
    hourlyForecastLast8Hours() { // >> []
      return this.$store.state.detailsHourlyForecast.slice(0, 8) || null
    },
  },
  methods: {
    getBottomLengthByTemp(temp) { // >> 0% - 100%
      const { minTemp, maxTemp } = this.minMax
      return 100*(temp-minTemp)/(maxTemp-minTemp)
    },
    getDateTime(ms) {
      const d = new Date(ms)
      return d.toLocaleString()
    },
    getDateTime2(ms) { // >> '12am' | 'Jan 1'
      const d = new Date(ms)
      const hours = ['12am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm']
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
      const h = hours[d.getHours()]
      if (h === '12am') return `${months[d.getMonth()]} ${d.getDate()}`
      return h
    },
    getColorByTemp(temp) {
      // currently supports only values from - 100°C to + 100°C
      const colors = ["#9ecffa", "#a3d1f5", "#a8d4f0", "#add6eb", "#b2d9e6", "#b8dbe0", "#bddedb", "#c2e0d6", "#c7e3d1", "#cce6cc", "#d1e8c7", "#d6ebc2", "#dbedbd", "#e0f0b8", "#e6f2b2", "#ebf5ad", "#f0f7a8", "#f5faa3", "#fafc9e", "#ffff99"] // length == 20
      return colors[((temp+100)/10).toFixed()]
    },
  },
}
</script>
<style scoped>
.my-class {
  --lh: 40px;
  height: 300px;
  padding-top: calc(var(--lh) + 2px);
}
.my-class > div > div {
  line-height: var(--lh);
}
</style>
