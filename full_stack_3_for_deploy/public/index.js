var app = new Vue({ 
  el: '#app',
  data() {
    return {
      code: '', brand: '', number: '', title: '', page: 0,
      items: [],
      error: ''
    }
  },
  methods: {
    // this method starts a new search with given values
    search: async function() {

      this.page = 0 // start a new search from the first page
      const requestObject = {
        code: this.code,
        brand: this.brand,
        number: this.number,
        title: this.title,
        page: this.page
      }
      
      try {
        const response = await services.requestData(requestObject)
        this.items = response
      } catch(error) {
        this.error = error.message
      }
    },

    // this method requests next 10 or so values and adds them to the items array
    loadMore: async function() {

      this.page += 1
      const requestObject = {
        code: this.code,
        brand: this.brand,
        number: this.number,
        title: this.title,
        page: this.page
      }

      try {
        const response = await services.requestData(requestObject)
        this.items.push(...response)
      } catch(error) {
        this.error = error.message
      }
    },

    // this method uploads an excel file to the server
    uploadFileToServer: async function(event) {
      try {
        await services.uploadFile(event.target.files[0])
      } catch (error) {
        this.error = error.message
      }
    }
  }
})