import React from 'react';
import axios from 'axios';

export default function useGetHomeData() {
  const [childPosts, setChildPosts] = React.useState([]);
  const [recentPosts, setRecentPosts] = React.useState([]);

  async function getData() {
    const uri = '/.netlify/functions/home';

    try {
      const { data } = await axios.get(uri);
      setChildPosts(data.childPosts);
      setRecentPosts(data.recentPosts);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  return { childPosts, recentPosts };
}
