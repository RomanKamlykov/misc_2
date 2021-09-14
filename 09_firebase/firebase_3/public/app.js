const firebase = window.firebase;
console.log(firebase);

// 1. ----- auth -----
const auth = firebase.auth(); // reference to auth sdk
console.log(auth);

const whenSignedIn = document.getElementById('whenSignedIn'); // makes DOM reference
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider(); // provider is equal to GoogleAuthProvider instance

// далее добавляем слушателей событий
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();
auth.onAuthStateChanged(user=>{
  if (user) {
    // signed in
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3><p>User ID: ${user.uid}</p>`;
  } else {
    // not signed in
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = ``;
  }
});

// 2. ----- firestore -----
const faker = window.faker;
const db = firebase.firestore(); // reference to firestore sdk
const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');

let thingsRef; // reference to a database location
let unsubscribe; // turn off realtime stream

// проверяем состояние аутентификации пользователя
auth.onAuthStateChanged(user=>{
  if (user) {
    thingsRef = db.collection('things');
    createThing.onclick = () => {

      const { serverTimestamp } = firebase.firestore.FieldValue;

      thingsRef.add({ // creates a new document
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: serverTimestamp() // Date.now() - не постоянное значение, serverTimestamp() обеспечивает единство значений на всех клиентских устройствах
      });
    }

    unsubscribe = thingsRef
      .where('uid', '==', user.uid) // query
      .orderBy('createdAt')
      // .get() // выполняет запрос единожды
      .onSnapshot( // подписка на изменения в БД
        querySnapshot => { // runs when data changes
          const items = querySnapshot.docs.map(
            doc => {
              return `<li>${doc.data().name}</li>`
            }
          );
          thingsList.innerHTML = items.join('');
        }
      )

  } else {
    unsubscribe && unsubscribe();
  }
});