// const url = 'http://localhost:5000/api/posts/';
// const url = 'api/posts/';

const PostService = {
  // get posts
  getPosts: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts/');
        const data = res.data;
        resolve(
          data.map( post => ({...post, createdAt: new Date(post.createdAt) }) ) // вернет массив объектов [{ ...свойства, createdAt }, {}, {}]
        );
      } catch (err) {
        reject(err);
      }
    })
  },
  // create post
  createPost: function(text) {
    return axios.post(url, { text });
  },
  // delete post
  deletePost: function(id) {
    return axios.delete(`${url}${id}`); // axios.delete(https://server/api/posts/id);
  }
}

// PostService from video
class PostService2 {
  // get posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map( post => ({...post, createdAt: new Date(post.createdAt) }) ) // вернет массив объектов [{ ...свойства, createdAt }, {}, {}]
        );
      } catch (err) {
        reject(err);
      }
    })
  }

  // create post
  static createPost(text) {
    return axios.post(url, { text });
  }
  
  // delete post
  static deletePost(id) {
    return axios.delete(`${url}${id}`); // axios.delete(https://server/api/posts/id);
  }
}