var app = new Vue({ 
  el: '#app',
  data: {
    customers: []
  },
  mounted: function() {
    fetch('http://localhost:5000/api/customers')
    .then(response => response.json())
    .then(customers => this.customers = customers);
  }
});