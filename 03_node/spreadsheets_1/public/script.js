// const spreadsheetID = '142jhrhsiiTWCra-DXLQFrVVwdM5AxlY4rjcSsE2PjDg';
const spreadsheetID = '1feG5cAW8oDobvd8KuPZoSSuPMnqw-BYIEObAQqc9x3c';
const range = 'база';
const apiKey = 'AIzaSyAGOXq9gXPu16AYY8xotSf1hmKn2XgwtO0';

const link = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${range}?majorDimension=ROWS&key=${apiKey}`;
// let resp = [];

// axios.get(link)
//   .then(function (response) {
//     // handle success
//     console.log(response.data.values);
//     resp = response.data.values;
//   })

let resp = axios.get(link)
  .then(function (response) {
    return response.data.values;
  })

var example1 = new Vue({
  el: '#example-1',
  data() {
    return {
      searchText: '',
      items: [],
      filteredItems: [],
      theader: [],
      tbody: []
    };
  },
  methods: {
    filterMethod: function (array) {
      if (this.searchText == '') {
        this.filteredItems = this.tbody;
      } else {
        this.filteredItems = array.filter( item => item[0].toLowerCase().includes(this.searchText.toLowerCase()) );
      }
    }
  },
  mounted() {
    axios.get(link).then(response => {
      this.theader = response.data.values[0];
      this.tbody = response.data.values.slice(1);
      this.filteredItems = this.tbody;
      // this.items = response.data.values
    });
  }
})