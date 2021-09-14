const requestURL = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url, body = null) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (this.status >= 400) {
                reject(this.response);
            } else {
                resolve(this.response);
            }
        }
        xhr.onerror = function() {
            reject(this.response);
        }
        xhr.send(body);
    })
}

sendRequest('GET', requestURL)
    .then(data => console.log(data))
    .catch(error => console.log(error));

const body = { name: 'Mike', age: 26 };

sendRequest('POST', requestURL, JSON.stringify(body))
    .then(data => console.log(data))
    .catch(error => console.log(error));