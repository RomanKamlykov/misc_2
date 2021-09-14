const { RouterLink } = VueRouter;

const template = `
  <div class="home">
    <nav class="nav">
      <ul>
        <li><router-link to="/">🏠</router-link></li>
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
          <form action="/new_note" method="GET" v-on:submit="addANewNote">
            <input type="hidden" name="parentNodeId" value="" />
            <input type="submit" value="Add a note" class="btn-link" />
          </form>
        </li>
      </ul>
    </div>
    
    <div class="search">
      <h3 class="search__header">Search</h3>
      <form action="/api/search" method="GET" v-on:submit="search">
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
    recentNotes: []
  }
}

async function mounted() {
  const response = await fetch('/api/home');
  const data = await response.json();
  this.childNotes = data.childNotes;
  this.recentNotes = data.recentNotes;
}

const components = {
  'router-link': RouterLink,
}

const methods = {
  addANewNote(e) {
    e.preventDefault();
    console.log(e.target[0].value);
  },
  search(e) {
    e.preventDefault();
    console.log(e.target[0].value);
  }
}

export const Home = { template, data, mounted, components, methods }
