const App = {
  data() {
    return {
      html: '',
      childNotes: [],
      path: [],
      id: '',
    };
  },
  async mounted() {
    // const user = netlifyIdentity.currentUser();
    if (localStorage.getItem('gotrue.user') == null) { window.location.href = "/"; }

    const params = (new URL(document.location)).searchParams;
    const noteId = params.get('id');
  
    const response = await fetch(`/.netlify/functions/getNote?id=${noteId}`);
    const data = await response.json();

    this.childNotes = data.childNotes;
    this.path = data.path;
    this.id = data.note._id;
    this.html = marked(data.note.markdown);
  },
  methods: {
    addANewNote(e) {
      e.preventDefault();
      console.log(e.target[0].value);
    },
    search(e) {
      e.preventDefault();
      console.log(e.target[0].value);
    }
  },
};

Vue.createApp(App).mount('#app');
