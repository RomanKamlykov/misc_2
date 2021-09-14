const { RouterLink } = window.VueRouter;

const template = `
  <div class="loader" v-if="isLoading"></div>
  <div class="home" v-else>
    <nav class="nav">
      <ul>
        <li><router-link to="/home">🏠</router-link></li>
      </ul>
      <ul>
        <li><router-link to="/notes-tree">🌳</router-link></li>
      </ul>
    </nav>

    <div class="child-notes">
      <h3 class="child-notes__header">Notes</h3>
      <ul>
        <li v-for="note in childNotes" v-bind:key="note._id" class="child-notes__link">
          <router-link v-bind:to="'/note/'+note._id">{{ note.title || 'Untitled' }}</router-link>
        </li>
        <li class="child-notes__new-note">
          <form action="/create" method="POST" v-on:submit="submitCreate">
            <input type="hidden" name="parentNodeId" value="" />
            <input type="submit" value="Add a note" class="btn-link" />
          </form>
        </li>
      </ul>
    </div>
    
    <div class="search">
      <h3 class="search__header">Search</h3>
      <form action="/search" method="GET" v-on:submit="submitSearch">
        <input type="text" name="search" />
        <input type="submit" value="Search" />
      </form>
    </div>
    
    <div class="recent-notes">
      <h3 class="recent-notes__header">Recent</h3>
      <ul>
        <li v-for="note in recentNotes" v-bind:key="note._id" class="recent-notes__link">
          <router-link v-bind:to="'/note/'+note._id">{{ note.title || 'Untitled' }}</router-link>
        </li>
      </ul>
    </div>
  </div>
`;

function data() {
  return {
    childNotes: [],
    recentNotes: [],
    isLoading: false,
  }
}

async function mounted() {
  this.isLoading = true;
  const token = this.getToken();
  // const response = await fetch('/.netlify/functions/pageHomeGet', {
  //   headers: { Authorization: `Bearer ${token}` }
  // });
  const response = await fetch('/.netlify/functions/note', {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'PAGE_HOME' }),
  });

  if (response.ok) {
    const data = await response.json();
    this.childNotes = data.childNotes;
    this.recentNotes = data.recentNotes;
    this.isLoading = false;
  } else {
    this.$router.push('/login');
  }
}

const components = {
  'router-link': RouterLink,
}

const methods = {
  async submitCreate(e) {
    e.preventDefault();
    this.isLoading = true;
    const token = this.getToken();
    const nodeId = '';
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
      this.$router.push('/login');
    }
  },
  submitSearch(e) {
    e.preventDefault();
    const query = e.target[0].value;
    if (query) this.$router.push(`/search/${query}`);
  },
  getToken() {
    const token = localStorage.getItem('auth-token');
    // if (!token) { this.$router.push('/login'); }
    return token;
  },
}

export const Home = { template, data, mounted, components, methods }
