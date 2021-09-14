// for development
const api = {
  search: 'http://localhost:5000/api/search',
  upload: 'http://localhost:5000/api/upload'
}

// for production
// const api = {
//   search: '/api/search',
//   upload: '/api/upload'
// }

const services = {
  requestData: function({ code, brand, number, title, page }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(api.search, { params: 
          {
            code: encodeURIComponent(code),
            brand: encodeURIComponent(brand),
            number: encodeURIComponent(number),
            title: encodeURIComponent(title),
            page: encodeURIComponent(page)
          } 
        });

        const data = res.data
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },
  uploadFile: async function(file) {
    let formData = new FormData()
    formData.append('price', file)
    try {
      await axios.post(api.upload, formData, {
        headers: {'Content-Type': 'multipart/form-data' }
      })
    } catch (error) {
      throw error
    }
  }
}