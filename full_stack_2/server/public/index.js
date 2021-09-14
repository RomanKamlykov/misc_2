var app = new Vue({ 
  el: '#app',
  data: {
    posts: [],
    error: '',
    text: ''
  },
  methods: {
    loadPosts: async function() {
      try {
        this.posts = await PostService.getPosts();
      } catch(err) {
        this.error = err.message;
      }
    },
    addPost: async function() {
      if (this.text) {
        await PostService.createPost(this.text);
        this.loadPosts();
        this.text = '';
      }
    },
    deletePost: async function(postId) {
      await PostService.deletePost(postId);
      this.loadPosts();
    }
  },
  created: function() {
    this.loadPosts();
    // PostService.getPosts().then(data => this.posts=data).catch(err => this.error = err.message)
    // try {
    //   this.posts = await PostService.getPosts();
    // } catch(err) {
    //   this.error = err.message;
    // }
  }
});