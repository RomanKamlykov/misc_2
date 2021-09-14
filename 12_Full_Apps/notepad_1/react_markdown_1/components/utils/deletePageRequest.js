import axios from 'axios';

export default async function deletePageRequest(id) {
  const uri = 'http://localhost:8888/.netlify/functions/deletePage';

  try {
    const result = confirm('You serious?');
    // if (result) console.log(id);
    // const { data } = await axios.delete(uri, { id });
    // if (confirm('You serious?')) console.log(id);
    // setArticle(data);

    if (result) await axios.delete(uri, { params: { id } });
  } catch (error) {
    console.error(error);
  }
}
