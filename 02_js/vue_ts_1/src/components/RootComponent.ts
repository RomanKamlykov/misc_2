import { defineComponent } from 'vue';
import Hello from './Hello';

const RootComponent = defineComponent({
  template: `
    <hello v-bind:name="name" />
    <div>{{ count }}</div>
    <button v-on:click="incrementCount">+1</button>
    <input v-model="name" />
  `,

  data() {
    return {
      count: 0,
      name: 'Roman',
    };
  },

  components: {
    'hello': Hello,
  },

  methods: {
    incrementCount() {
      this.count += 1;
    },
  },
});

export default RootComponent;
