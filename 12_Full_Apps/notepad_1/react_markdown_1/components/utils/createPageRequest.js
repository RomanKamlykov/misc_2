import axios from 'axios';

export default async function createPageRequest(parentId) {
  const uri = 'http://localhost:8888/.netlify/functions/createPage';

  try {
    const { data: createdPageId } = await axios.post(uri, { id: parentId });

    return createdPageId;
  } catch (error) {
    console.log(error);
  }
}
