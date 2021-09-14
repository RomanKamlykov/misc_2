import axios from 'axios';

export default async function getHomeData() {
  const uri = 'http://localhost:8888/.netlify/functions/home';

  try {
    const { data } = await axios.get(uri);
    return data;
  } catch (error) {
    console.log(error);
  }
}
