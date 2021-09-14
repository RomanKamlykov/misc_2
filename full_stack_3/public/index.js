var app = new Vue({ 
  el: '#app',
  data: {
    items: [],
    filteredItems: [],
    error: '',
    searchText: '',
  },
  methods: {
    filterMethod: function (array) {
      if (this.searchText == '') {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = array.filter( item => item.description.toLowerCase().includes(this.searchText.toLowerCase()) );
      }
    },
    // loadPosts: async function() {
    //   try {
    //     this.posts = await PostService.getPosts();
    //   } catch(err) {
    //     this.error = err.message;
    //   }
    // },
    // addPost: async function() {
    //   if (this.text) {
    //     await PostService.createPost(this.text);
    //     this.loadPosts();
    //     this.text = '';
    //   }
    // },
    // deletePost: async function(postId) {
    //   await PostService.deletePost(postId);
    //   this.loadPosts();
    // },
    loadLiquids: async function() {
      try {
        this.items = await LiquidsService.getLiquids();
        this.filteredItems = this.items;
      } catch(err) {
        this.error = err.message;
      }
    },
  },
  created: function() {
    // this.loadPosts();
    this.loadLiquids();

    // PostService.getPosts().then(data => this.posts=data).catch(err => this.error = err.message)
    // try {
    //   this.posts = await PostService.getPosts();
    // } catch(err) {
    //   this.error = err.message;
    // }
  }
});