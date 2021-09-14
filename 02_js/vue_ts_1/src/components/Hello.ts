import { defineComponent } from 'vue';

const Hello = defineComponent({
  template: `
    <h1>Hello to {{ name }}!</h1>
  `,
  props: [
    'name',
  ],
});

export default Hello;
