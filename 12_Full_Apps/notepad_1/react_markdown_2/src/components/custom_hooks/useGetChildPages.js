import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetChildPages(id = '0') {
  const [array, setArray] = useState([]);

  async function getData() {
    const uri = `http://localhost:5000/pages/child/${id}`;

    try {
      const { data } = await axios.get(uri);
      setArray(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  return array;
}
