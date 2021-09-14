const { RouterLink } = VueRouter;

const template = `
  <div class="editor">
    <form action="/edit?id=<%= note._id %>" method="POST">
      <textarea id="markdown" name="markdown" rows="4" cols="50">{{ note.markdown }}</textarea>

      <ul class="control">
        <li><a href="/help" class="btn-plain">❔</a></li>
        <li><button type="submit" class="btn-plain">💾</button></li>
        <li><a href="/note?id=<%= note._id %>" class="btn-plain">🚪</a></li>
      </ul>
    </form>
  </div>

  <div class="preview content" v-html="html"></div>
`;

function data() {
  return {
    html: '',
    note: {},
  }
}

const props = [
  'id'
]

const watch = {
  id: {
    handler() { this.fetchData(); },
    immediate: true,
  }
}

const components = {
  'router-link': RouterLink,
}

const methods = {
  fetchData: async function() {
    // const postId = this.$route.params.id;
    const response = await fetch(`/api/edit/${this.id}`);
    const data = await response.json();

    this.note = data.post;
    this.html = marked(data.note.markdown);
  }
}

export const Edit = { template, data, props, watch, components, methods, }
