// const url = 'http://localhost:5000/api/liquids/';
// const url = 'api/liquids/';

const LiquidsService = {
  // get liquids
  getLiquids: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get('http://localhost:5000/api/liquids/');
        const data = res.data;
        resolve(data);
        
        // resolve(
        //   data.map( liquid => ({ ...liquid }) ) // вернет массив объектов [{ ...свойства, createdAt }, {}, {}]
        // );
      } catch (err) {
        reject(err);
      }
    })
  }
}