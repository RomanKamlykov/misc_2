const app = new Vue({
  el: '#app',
  data() {
    return {
      card: '',
      mySegm: '',
      code: '',
      title: '',
      desc: '',
      page: 0,
      items: [],
      error: '',
    };
  },
  methods: {
    // this method starts a new search with given values
    async search() {
      this.items = [];
      this.page = 0; // start a new search from the first page
      const requestObject = {
        card: this.card,
        mySegm: this.mySegm,
        code: this.code,
        title: this.title,
        desc: this.desc,
        page: this.page,
      };

      try {
        const response = await services.requestData(requestObject);
        this.items = response;
      } catch (error) {
        this.error = error.message;
      }
    },

    // this method requests next 10 or so values and adds them to the items array
    async loadMore() {
      this.page += 1;
      const requestObject = {
        card: this.card,
        mySegm: this.mySegm,
        code: this.code,
        title: this.title,
        desc: this.desc,
        page: this.page,
      };

      try {
        const response = await services.requestData(requestObject);
        this.items.push(...response);
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
  },
});
