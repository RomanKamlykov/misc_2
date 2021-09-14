const SearchService = {
  getData: function({ brand, number, name, page }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get('http://localhost:5000/api/search', { params: 
          {
            brand: encodeURIComponent(brand),
            number: encodeURIComponent(number),
            name: encodeURIComponent(name),
            page: encodeURIComponent(page)
          } 
        });

        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    })
  },
  sendFile: async function(file) {
    let formData = new FormData();
    formData.append('price', file);
    try {
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data' }
      });
    } catch (error) {
      console.log(error);
    }
  }
}