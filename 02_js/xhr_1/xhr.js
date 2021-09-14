const requestURL = 'https://jsonplaceholder.typicode.com/users';

const xhr = new XMLHttpRequest();

xhr.open('GET', requestURL);
xhr.responseType = 'json';
xhr.onload = function() {
    if (this.status >= 400) {
        console.error(this.response);
    } else {
        console.log(this.response);
    }
}
xhr.onerror = function() {
    console.log(this.response);
}
xhr.send();