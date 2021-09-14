import axios from 'axios';
// import titleMaker from './titleMaker';

export default async function updatePageRequest(id, markdown) {
  const uri = 'http://localhost:8888/.netlify/functions/updatePage';
  // const title = titleMaker(markdown);

  // if (!title) return;
  // const parent = parentMaker();
  // const parent = Number(parentKey);

  // const page = {
  //   id,
  //   title,
  //   markdown,
  // };

  try {
    await axios.post(uri, { id, markdown });
  } catch (error) {
    console.log(error);
  }
}
