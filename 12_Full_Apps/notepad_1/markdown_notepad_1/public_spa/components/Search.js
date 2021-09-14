const { RouterLink } = window.VueRouter;

const template = `
  <div class="loader" v-if="isLoading"></div>
  <div class="search-page" v-else>
    <nav class="nav">
      <ul>
        <router-link to="/home">🏠</router-link>
      </ul>
      <ul>
        <li><router-link to="/notes-tree">🌳</router-link></li>
      </ul>
    </nav>

    <div class="search-form">
      <h3 class="search__header">Search</h3>
      <form action="/search" method="GET" v-on:submit="submitSearch">
        <input type="text" name="search" v-bind:value="query" />
        <input type="submit" value="Search" />
      </form>
    </div>

    <div class="notes">
      <h3>Notes</h3>
      <ul>
        <li v-for="note in notes" v-bind:key="note._id" class="recent-notes__link">
          <router-link v-bind:to="'/note/'+note._id">{{ note.title || 'Untitled' }}</router-link>
        </li>
      </ul>
    </div>
  </div>
`;

function data() {
  return {
    notes: [],
    isLoading: false,
  }
}

const props = [
  'query'
]

const watch = {
  query: {
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
    // const response = await fetch(`/.netlify/functions/pageSearchGet?query=${this.query}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    const response = await fetch('/.netlify/functions/note', {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'PAGE_SEARCH', query: this.query }),
    });

    if (response.ok) {
      const data = await response.json();
      this.notes = data.notes;
      this.isLoading = false;
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

export const Search = { template, data, components, methods, props, watch }
