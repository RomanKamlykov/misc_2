import axios from 'axios';

export default async function createPageRequest(parentId) {
  const uri = 'http://localhost:5000/page';

  try {
    const { data: createdPageId } = await axios.post(uri, { parentId });
    return createdPageId;
  } catch (error) {
    console.log(error);
  }
}
