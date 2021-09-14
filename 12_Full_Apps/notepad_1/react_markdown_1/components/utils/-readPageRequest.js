import axios from 'axios';

export default async function readPageRequest(id) {
  const uri = 'http://localhost:8888/.netlify/functions/readPage';

  try {
    const { data } = await axios.get(uri, { params: { id } });
    return data;
  } catch (error) {
    console.log(error);
    return '';
  }
}
