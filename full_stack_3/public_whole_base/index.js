var app = new Vue({ 
  el: '#app',
  data() {
    return {
      items: [],
      filteredItems: [],
      error: '',
      brand: '',
      number: '',
      name: '',
      page: 0,
      file: '',
      log: []
    }
  },
  methods: {
    filterMethod: function (array) {
      if (this.searchText == '') {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = array.filter( item => item.name.toLowerCase().includes(this.searchText.toLowerCase()) );
      }
    },
    uploadFileToServer: async function(event) {
      // this.file = await this.$refs.file.files[0];

      // SearchService.sendFile(this.file);
      SearchService.sendFile(event.target.files[0]);
      // console.log(event.target.files[0]);
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
        this.items = await WholeBaseService.getData();
        this.filteredItems = this.items;
      } catch(err) {
        this.error = err.message;
      }
    },
    logger: function(msg) {
      const id = (new Date()).getTime();
      this.log.push({ id, msg });

      setTimeout(() => {
        this.log = this.log.filter(el => {
          return el.id != id
        });
      }, 1000, id);
    },
    search: async function() {
      if(this.brand || this.number || this.name) {
        try {
          this.page = 0;
          this.logger('Loading...');
          this.items = await SearchService.getData({ brand: this.brand, number: this.number, name: this.name, page: this.page });
          this.logger('Loaded!');
        } catch(err) {
          this.error = err.message;
        }
      }
    },
    loadMore: async function() {
      try {
        this.page += 1;
        // const newItems = await SearchService.getData({ brand: this.brand, number: this.number, name: this.name, page: this.page });
        // this.items.push( ...newItems );
        this.items.push( ...await SearchService.getData({ brand: this.brand, number: this.number, name: this.name, page: this.page }) );
      } catch(err) {
        this.error = err.message;
      }
    },
    selectFile: function() {
      this.file = this.$refs.file.files[0];
    },
    sendFile: async function() {
      const formData = new FormData();
      formData.append('price', this.file);
      try {
        await axios.post('http://localhost:5000/api/upload', formData);
        // this.message = "File has been uploaded";
        this.file = '';
      } catch(err) {
        console.log(err);
      }
    },
    send: function() {
      this.selectFile();
      this.sendFile();
    },
    
  },
  created: function() {
    // this.loadPosts();
    // this.loadLiquids();

    // PostService.getPosts().then(data => this.posts=data).catch(err => this.error = err.message)
    // try {
    //   this.posts = await PostService.getPosts();
    // } catch(err) {
    //   this.error = err.message;
    // }
  }
});