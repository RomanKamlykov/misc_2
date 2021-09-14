const url1 = 'https://reqres.in/api/users';
const url2 = 'https://jsonplaceholder.typicode.com/todos';

// GET REQUEST
function getTodos() {
  // 1.
  // axios({
  //   method: 'get',
  //   url: url1,
  //   params: {
  //     _limit: 5
  //   }
  // }).then(res => showOutput(res)).catch(err => console.error(err));
  // 2.
  // axios.get(url1, { params: { limit: 5 } }).then(res => showOutput(res)).catch(err => console.error(err));
  // 3.
  // axios.get(`${url1}?_limit=5`).then(res => showOutput(res)).catch(err => console.error(err));
  // 4.
  axios(`${url1}?_limit=5`).then(res => showOutput(res)).catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  // 1.
  // axios({
  //   method: 'post',
  //   url: url1,
  //   data: {
  //     name: "morpheus",
  //     job: "leader"
  //   }
  // }).then(res => showOutput(res)).catch(err => console.error(err));
  // 2.
  axios.post(url1, { name: "morpheus", job: "leader" }).then(res => showOutput(res)).catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  const id = 2;
  // axios.put(`${url1}/${id}`, { name: "morpheus", job: "zion resident" }).then(res => showOutput(res)).catch(err => console.error(err));
  axios.patch(`${url1}/${id}`, { name: "morpheus", job: "zion resident" }).then(res => showOutput(res)).catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  const id = 2;
  axios.delete(`${url1}/${id}`).then(res => showOutput(res)).catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  // 1.
  // axios.all([
  //   axios.get(url1),
  //   axios.get(url2)
  // ]).then(res => console.log(res[0])).catch(err => console.error(err));
  // 2.
  axios.all([
    axios.get(url1),
    axios.get(url2)
  ]).then(axios.spread( (users, todos) => console.log(users) )).catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  }
  axios.post(url1, { name: "morpheus", job: "leader" }, config).then(res => showOutput(res)).catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: url1,
    data: { name: "morpheus", job: "leader" },
    transformResponse: axios.defaults.transformResponse.concat(data => { data.name = data.name.toUpperCase(); return data; })
  }
  axios(options).then(res => showOutput(res)).catch(err => console.error(err));
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`);
  return config;
}, err => Promise.reject(err));

axios.interceptors.request.use(config => {
  useLoader('Loading...');
  return config;
}, err => Promise.reject(err));

axios.interceptors.response.use(response => {
  useLoader('Loaded!');
  return response;
}, err => Promise.reject(err));

// AXIOS INSTANCES

// use loader
function useLoader(text) {
  document.getElementById('loader').innerHTML = `<span>${text}</span>`;
}

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);