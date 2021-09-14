const App = {
  data() {
    return {
      formData: {},
      items: [],
      error: '',
    };
  },
  methods: {
    // this method starts a new search with given values
    async search() {
      this.items = [];
      this.formData.page = 0; // start a new search from the first page

      try {
        const response = await services.requestData(this.formData);
        this.items = response;
      } catch (error) {
        this.error = error.message;
      }
    },

    // this method requests next 10 or so values and adds them to the items array
    async loadMore() {
      this.formData.page += 1;

      try {
        const response = await services.requestData(this.formData);
        this.items.push(...response);
        // this.items = [...this.items, ...response];
      } catch (error) {
        this.error = error.message;
      }
    },

    // this method uploads an excel file to the server
    async uploadFileToServer(event) {
      try {
        await services.uploadFile(event.target.files[0]);
      } catch (error) {
        this.error = error.message;
      }
    },
    toggleClass(event) {
      event.target.classList.toggle('truncate');
    },
    clear() {
      this.formData = {};
      this.items = [];
    },
  },
};

Vue.createApp(App).mount('#app');
