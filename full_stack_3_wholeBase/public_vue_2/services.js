// for development
const api = {
  search: 'http://localhost:5000/api/search',
  upload: 'http://localhost:5000/api/upload',
};

// for production
// const api = {
//   search: '/api/search',
//   upload: '/api/upload'
// }

const services = {
  requestData({
    card, mySegm, code, title, desc, page,
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(api.search, {
          params:
          {
            card: encodeURIComponent(card),
            mySegm: encodeURIComponent(mySegm),
            code: encodeURIComponent(code),
            title: encodeURIComponent(title),
            desc: encodeURIComponent(desc),
            page: encodeURIComponent(page),
          },
        });

        const { data } = res;
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('price', file);
    try {
      await axios.post(api.upload, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      throw error;
    }
  },
};
