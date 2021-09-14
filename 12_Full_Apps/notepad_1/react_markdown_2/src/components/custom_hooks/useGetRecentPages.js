import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetRecentPages() {
  const [array, setArray] = useState([]);

  async function getData() {
    const uri = 'http://localhost:5000/pages/recent';

    try {
      const { data } = await axios.get(uri);
      setArray(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return array;
}
