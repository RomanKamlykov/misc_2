// for development
// const api = {
//   search: 'http://localhost:5000/api/search',
//   upload: 'http://localhost:5000/api/upload',
// };

// for production
// const api = {
//   search: '/api/search',
//   upload: '/api/upload'
// }

// const services = {
//   requestData(formData) {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const params = new URLSearchParams(formData);
//         const response = await fetch(`/api/search?${params}`);
//         const data = await response.json();
//         resolve(data);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   },
//   async uploadFile(file) {
//     const formData = new FormData();
//     formData.append('price', file);
//     try {
//       await axios.post(api.upload, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// const url = 'http://localhost:8888/.netlify/functions/getData'
// const url = '/.netlify/functions/getData'

const services = {
  async requestData(formData) {
    const params = new URLSearchParams(formData);
    const response = await fetch(`/.netlify/functions/getData?${params}`);
    const { products } = await response.json();
    return products;
  },
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('price', file);

    await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });
    // await axios.post(api.upload, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
  },
};
