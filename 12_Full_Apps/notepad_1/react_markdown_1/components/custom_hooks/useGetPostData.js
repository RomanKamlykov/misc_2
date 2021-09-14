import React from 'react';
import axios from 'axios';

export default function useGetPostData(id) {
  const [path, setPath] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const [childPosts, setChildPosts] = React.useState([]);

  async function getData() {
    const uri = '/.netlify/functions/post';

    try {
      const { data } = await axios.get(uri, { params: { id } });
      setPath(data.path);
      setPost(data.post);
      setChildPosts(data.childPosts);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getData();
  }, [id]);

  return { path, post, childPosts };
}
