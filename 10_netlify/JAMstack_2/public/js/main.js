const url = 'http://localhost:8888/.netlify/functions/getUsers'
// const url = '/.netlify/functions/getUsers'

const fetchUsers = async () => {
  return await (await fetch(url)).json();
}

fetchUsers().then(data => {
  const userList = document.querySelector('#users');
  data.forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    const link = document.createElement('a');
    link.appendChild(document.createTextNode(user.login));
    link.href = user.html_url;
    link.target = '_blank';
    li.appendChild(link);
    userList.appendChild(li);
  })
})