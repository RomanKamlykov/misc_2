import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetArticlesTree() {
  const [articles, setArticles] = useState([]);

  const getData = async () => {
    const uri = 'http://localhost:8888/.netlify/functions/getAllPagesList';

    try {
      const { data } = await axios.get(uri);
      setArticles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return articles;
}
