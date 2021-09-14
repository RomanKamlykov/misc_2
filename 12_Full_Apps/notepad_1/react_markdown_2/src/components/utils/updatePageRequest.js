import axios from 'axios';

export default async function updatePageRequest(id, markdown) {
  const uri = `http://localhost:5000/page/${id}`;

  try {
    await axios.patch(uri, { markdown });
  } catch (error) {
    console.log(error);
  }
}
