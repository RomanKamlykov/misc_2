import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetFavoritePages() {
  const [array, setArray] = useState([]);

  const getData = async () => {
    const uri = 'http://localhost:8888/.netlify/functions/getFavoritePages';

    try {
      const { data } = await axios.get(uri);
      setArray(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return array;
}
