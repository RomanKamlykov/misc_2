// const { Vue, Vuex } = window;

// Create a new store instance.
const store = Vuex.createStore({
  state() {
    return {
      count: 0
    };
  },

  mutations: {
    increment(state) {
      state.count++
    },
  },
});

const RootComponent = {
  template: `
    <div>{{ count }}</div>
    <button v-on:click="incrementCount">+1</button>
  `,

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    count() {
      return this.$store.state.count;
    },
  },

  methods: {
    incrementCount() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
  },
};

const app = Vue.createApp(RootComponent)
app.use(store)
app.mount('#app');
