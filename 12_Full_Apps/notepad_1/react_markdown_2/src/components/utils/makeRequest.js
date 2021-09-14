import axios from 'axios';
import { useHistory } from 'react-router-dom';

const { authToken } = window.localStorage;

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 1000,
  headers: { 'auth-toke': authToken },
});

function handleError(error) {
  const history = useHistory();
  if (error.response) {
    switch (error.response.status) {
      case 400:
      case 401:
        history.push('/login');
        break;
      default:
        console.log(error);
    }
  }
}

export async function createPage(parentId) {
  const uri = 'http://localhost:5000/page';

  try {
    const { data: createdPageId } = await axios.post(uri, { parentId });
    // const createdPageId = response.data;
    return createdPageId;
  } catch (error) {
    handleError(error);
  }
}

export async function readPage(id) {
  try {
    const { data } = await instance.get(`/page/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function updatePage(parentId) {
  const uri = 'http://localhost:5000/page';

  try {
    const { data: createdPageId } = await axios.post(uri, { parentId });
    // const createdPageId = response.data;
    return createdPageId;
  } catch (error) {
    handleError(error);
  }
}

export async function deletePage(parentId) {
  const uri = 'http://localhost:5000/page';

  try {
    const { data: createdPageId } = await axios.post(uri, { parentId });
    // const createdPageId = response.data;
    return createdPageId;
  } catch (error) {
    handleError(error);
  }
}
