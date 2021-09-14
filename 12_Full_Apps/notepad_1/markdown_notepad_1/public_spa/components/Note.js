const { RouterLink } = window.VueRouter;

const template = `
  <div class="loader" v-if="isLoading"></div>
  <div class="note" v-else>
    <nav class="nav">
      <ul class="breadcrumb">
        <li>
          <router-link to="/home">🏠</router-link>
        </li>
        <li v-if="path[0].parentNodeId">...</li>
        <li v-for="note in path" v-bind:key="note._id">
          <router-link v-bind:to="'/note/'+note._id">{{ note.title || 'Untitled' }}</router-link>
        </li>
      </ul>
      <ul class="control">
        <li>
          <button class="btn-plain" id="move-note-btn" v-on:click="noteUpdate">🔃</button>
        </li>
        <li>
          <router-link v-bind:to="'/edit/'+id" class="btn-plain">✏️</router-link>
        </li>
        <li>
          <button class="btn-plain" id="delete-btn" v-on:click="noteDelete">🗑️</button>
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
          <form action="/create" method="POST" v-on:submit="submitCreate">
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
    note: {},
    html: '',
    childNotes: [],
    path: [],
    isLoading: false,
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
    this.isLoading = true;
    const token = this.getToken();
    // const response = await fetch(`/.netlify/functions/noteRead?id=${this.id}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    const response = await fetch('/.netlify/functions/note', {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'READ', id: this.id }),
    });

    if (response.ok) {
      const data = await response.json();
      this.childNotes = data.childNotes;
      this.path = data.path;
      this.note = data.note;
      this.html = marked(data.note.markdown);
      this.isLoading = false;
    } else {
      this.$router.push('/login');
    }
  },
  async submitCreate(e) {
    e.preventDefault();
    this.isLoading = true;
    const token = this.getToken();
    const nodeId = this.note.nodeId;
    // const response = await fetch('/.netlify/functions/noteCreate', {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nodeId }),
    // });
    const response = await fetch('/.netlify/functions/note', {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'CREATE', nodeId }),
    });

    if (response.ok) {
      const data = await response.json();
      this.$router.push(`/note/${data.note._id}`); 
    } else {
      this.$router.push('/home');
    }
  },
  async noteDelete() {
    const result = window.confirm('Are you sirius?');
    if (result) {
      this.isLoading = true;
      const token = this.getToken();
      // const response = await fetch('/.netlify/functions/noteDelete', {
      //   method: "DELETE",
      //   headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id: this.id }),
      // });
      const response = await fetch('/.netlify/functions/note', {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'DELETE', id: this.id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.parentNote) {
          this.$router.push(`/note/${data.parentNote._id}`);
        } else {
          this.$router.push('/home');
        }
      } else {
        this.isLoading = false;
      }
    }
  },
  async noteUpdate() {
    const result = window.prompt('Enter the new parent id');
    if (result) {
      this.isLoading = true;
      const token = this.getToken();
      // const response = await fetch('/.netlify/functions/noteUpdate', {
      //   method: "POST",
      //   headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id: this.id, parentId: result }),
      // });
      const response = await fetch('/.netlify/functions/note', {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UPDATE', id: this.id, parentId: result }),
      });

      if (response.ok) {
        const data = await response.json();
        this.path = data.path;
        this.isLoading = false;
      } else {
        this.$router.push('/login');
      }
    }
  },
  getToken() {
    const token = localStorage.getItem('auth-token');
    // if (!token) { this.$router.push('/login'); }
    return token;
  },
}

export const Note = { template, data, props, watch, components, methods, }
