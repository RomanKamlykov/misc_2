const { RouterLink } = window.VueRouter;

const template = `
  <div class="loader" v-if="isLoading"></div>
  <template v-else>
    <div class="editor">
      <form action="/update" method="POST" v-on:submit="submitUpdate">
        <textarea id="markdown" name="markdown" rows="4" cols="50" v-model="markdown"></textarea>

        <ul class="control">
          <li><router-link to="/help" class="btn-plain">❔</router-link></li>
          <li><button type="submit" class="btn-plain">💾</button></li>
          <li><router-link v-bind:to="'/note/'+id" class="btn-plain">🚪</router-link></li>
        </ul>
      </form>
    </div>

    <div class="preview content" v-html="html"></div>
  </template>
`;

function data() {
  return {
    markdown: '',
    isLoading: false,
  }
}

const computed = {
  html() {
    return marked(this.markdown);
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
    // const response = await fetch(`/.netlify/functions/pageEditGet?id=${this.id}`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    const response = await fetch('/.netlify/functions/note', {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'PAGE_EDIT', id: this.id }),
    });

    if (response.ok) {
      const data = await response.json();
      this.markdown = data.note.markdown;
      this.isLoading = false;
    } else {
      this.$router.push('/login');
    }
  },
  async submitUpdate(e) {
    e.preventDefault();
    this.isLoading = true;
    const token = this.getToken();
    // const response = await fetch('/.netlify/functions/noteUpdate', {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id: this.id, markdown: e.target[0].value }),
    // });
    const response = await fetch('/.netlify/functions/note', {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'UPDATE', id: this.id, markdown: e.target[0].value }),
    });

    if (response.ok) {
      const data = await response.json();
      this.markdown = data.note.markdown;
      this.isLoading = false;
    } else {
      this.$router.push('/login');
    }
  },
  getToken() {
    const token = localStorage.getItem('auth-token');
    // if (!token) { this.$router.push('/login'); }
    return token;
  },
}

export const Edit = { template, data, computed, props, watch, components, methods, }
