import axios from 'axios';

export default async function deletePageRequest(id) {
  const uri = `http://localhost:5000/page/${id}`;

  try {
    const result = confirm('You serious?');
    if (result) await axios.delete(uri);
  } catch (error) {
    console.error(error);
  }
}
