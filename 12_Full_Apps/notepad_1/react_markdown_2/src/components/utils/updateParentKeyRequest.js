import axios from 'axios';

export default async function updateParentKeyRequest(id, parentId) {
  const uri = `http://localhost:5000/page/update-parent-key/${id}`;

  try {
    await axios.patch(uri, { parentId });
  } catch (error) {
    console.log(error);
  }
}
