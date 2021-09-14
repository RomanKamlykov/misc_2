const App = {
  data() {
    return {
      childNotes: [],
      recentNotes: [],
    };
  },
  async mounted() {
    // const user = netlifyIdentity.currentUser();
    if (localStorage.getItem('gotrue.user') == null) { window.location.href = "/"; }
    
    const token = await this.getToken();
    const response = await fetch('/.netlify/functions/getHome', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    this.childNotes = data.childNotes;
    this.recentNotes = data.recentNotes;
  },
  methods: {
    addANewNote(e) {
      e.preventDefault();
      console.log(e.target[0].value);
    },
    async getToken() {
      const currentUser = netlifyIdentity.currentUser();
      if (!currentUser) {
        return '';
      }
      // fetchs new JWT token only if expired
      await currentUser.jwt();
      return currentUser.token.access_token;
    },  
    search(e) {
      e.preventDefault();
      console.log(e.target[0].value);
    }
  },
};

Vue.createApp(App).mount('#app');
