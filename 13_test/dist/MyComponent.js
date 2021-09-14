import { openBlock, createBlock, toDisplayString } from 'vue';

var script = {
  data() {
    return {
      text: 'some text'
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", null, toDisplayString($data.text), 1 /* TEXT */))
}

script.render = render;
script.__file = "src/MyComponent.vue";

export { script as default };
