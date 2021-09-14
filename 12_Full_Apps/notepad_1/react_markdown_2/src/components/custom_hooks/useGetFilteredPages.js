import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetFilteredPages(query) {
  const [pages, setPages] = useState([]);

  const getData = async () => {
    const uri = `http://localhost:5000/pages/search/${query}`;

    try {
      const { data } = await axios.get(uri);
      setPages(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [query]);

  return pages;
}
