const { RouterLink } = VueRouter;

const template = `
  <div class="note">
    <nav class="nav">
      <ul class="breadcrumb">
        <li>
          <router-link to="/">🏠</router-link>
        </li>
        <li v-for="note in path" v-bind:key="note._id">
          <router-link v-bind:to="'/note/'+note._id">{{ note.title || 'Untitled' }}</router-link>
        </li>
      </ul>
      <ul class="control">
        <li>
          <button class="btn-plain" id="move-note-btn">🔃</button>
        </li>
        <li>
          <router-link v-bind:to="'/edit/'+id" class="btn-plain">✏️</router-link>
        </li>
        <li>
          <button class="btn-plain" id="delete-btn">🗑️</button>
        </li>
      </ul>
    </nav>

    <div class="content" v-html="html">
    </div>
    
    <div class="child-notes">
      <h3 class="child-notes__header">Notes</h3>
      <ul>
        <li v-for="note in childNotes" v-bind:key="note._id" class="child-notes__link">
          <router-link v-bind:to="'/note/'+note._id">{{ note.title || 'Untitled' }}</router-link>
        </li>
        <li class="child-notes__new-note">
          <form action="/new_note" method="GET" v-on:submit="addANewNote">
            <input type="hidden" name="parentNodeId" v-bind:value="id" />
            <input type="submit" value="Add a note" class="btn-link" />
          </form>
        </li>
      </ul>
    </div>

  </div>
`;

function data() {
  return {
    html: '',
    childNotes: [],
    path: [],
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
  async fetchData() {
    // const noteId = this.$route.params.id;
    const response = await fetch(`/api/note/${this.id}`);
    const data = await response.json();

    this.childNotes = data.childNotes;
    this.path = data.path;
    this.html = marked(data.note.markdown);
  },
  addANewNote(e) {
    e.preventDefault();
    console.log(e.target[0].value);
  }
}

export const Note = { template, data, props, watch, components, methods, }
