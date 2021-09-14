import React from 'react';
import axios from 'axios';

export default function useGetPostData(q) {
  const [posts, setPosts] = React.useState([]);

  async function getData() {
    const uri = '/.netlify/functions/search';

    try {
      const { data } = await axios.get(uri, { params: { q } });
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, [q]);

  return { posts };
}
