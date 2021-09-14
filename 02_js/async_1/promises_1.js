const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];


function getPosts() {
  function insertPosts() {
    let output = '';
    posts.forEach( post => output += `<li>${post.title}</li>` );
    document.body.innerHTML = output;
  }

  // имитируем запрос с сервера
  setTimeout(insertPosts, 1000);
}
getPosts();


// callback удаляем, возвращаем promise
function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;
      if(!error) {
        resolve();
      }
      else {
        reject('Error: Something went wrong!');
      }
    }, 2000);
  });
}

const newPost = { title: 'Post Three', body: 'This is post three'};
function errorHandler(err) {
  console.log(err);
}
createPost(newPost).then(getPosts).catch(errorHandler); // в случае resolve(); происходит вызов getPosts, в случае reject(); происходит вызов errorHandler