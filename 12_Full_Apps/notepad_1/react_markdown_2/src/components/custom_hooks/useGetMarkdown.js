import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetMarkdown(id) {
  const [markdown, setMarkdown] = useState('');

  async function getData() {
    const uri = `http://localhost:5000/page/${id}`;

    try {
      const { data } = await axios.get(uri);
      setMarkdown(data.markdown);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  return [markdown, setMarkdown];
}
