// скрипт для авторизации
document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app(); // получим объект со всеми firebase credentials
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user; // user information object
      document.write(`Hello ${user.displayName}`);
    })
    .catch(console.log);
}

// скрипт для получения данных из Firestore db
document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('XHJBAgYpMjD3xgBGaNP6');
  myPost.get()
    .then(doc=>{
      const data = doc.data();
      console.log(data.title);
    });

  myPost.onSnapshot(doc=>{
    const data = doc.data();
    console.log(data.title);
    document.getElementById('text').textContent = data.title;
  });
});

// скрипт для изменения данных в Firestore db
function updatePost(e) {
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('XHJBAgYpMjD3xgBGaNP6');
  myPost.update({ title : e.target.value });
}

// скрипт для получения множества данных из Firestore db
document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  const db = firebase.firestore();
  const productsRef = db.collection('products');

  const query = productsRef.where('price', '>', 10); // все продукты с ценой более 10
  query.get()
    .then(products=>{
      products.forEach(doc=>{
        const data = doc.data();
        console.log(`${data.name} at $${data.price}`);
      });
    });

  const query2 = productsRef.orderBy('price', 'asc').limit(2);
  query2.get()
    .then(products=>{
      products.forEach(doc=>{
        const data = doc.data();
        console.log(`${data.name} at $${data.price}`);
      });
    });
  
});

// скрипт для загрузки файлов в Firebase Storage
function uploadFile(files) {
  const storageRef = firebase.storage().ref(); // создаем reference к storage
  const horseRef = storageRef.child('horse.jpg'); // с этой reference можем 1.upload file, 2.download existing file URL
  
  // form input (files) возвращает file list
  const file = files.item(0);
  const task = horseRef.put(file); // upload the file
  task.then(snapshot=>{
    console.log(snapshot);
    snapshot.ref.getDownloadURL().then(url=> {
      document.querySelector('#imgUpload').setAttribute('src', url);
    });
  });
}