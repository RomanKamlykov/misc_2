export const MyComponent = {
  data() {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Счётчик кликов - {{ count }}</button>',
}
