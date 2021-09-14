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


// function createPost(post) {
// 	setTimeout(() => {
//     posts.push(post);
//   }, 2000);
// }
// let newPost = { title: 'Post Three', body: 'This is post three'};
// createPost(newPost);
// отрисовка третьего post не происходит, необходимо добавить callback к функции createPost, который будет обновлять документ после добавления post

function createPost(post, callback) {
	setTimeout(() => {
    posts.push(post);
    callback();
  }, 2000);
}
const newPost = { title: 'Post Three', body: 'This is post three'};
createPost(newPost, getPosts); // getPosts передается в качестве callback функции

// в итоге суть асинхронности такого js в асинхронности setTimeout/XmlHttpRequest