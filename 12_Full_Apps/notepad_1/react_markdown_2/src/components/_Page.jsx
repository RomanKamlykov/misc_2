import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
// import useGetPage from './custom_hooks/-useGetPage';
import useGetMarkdown from './custom_hooks/useGetMarkdown';
// import { readPage } from './utils/makeRequest';

export default function Page() {
  const { id } = useParams();
  const [markdown] = useGetMarkdown(id);
  // const [markdown, setMarkdown] = useState('');
  // useEffect(() => {
  //   const data = readPage(id);
  //   setMarkdown(data.markdown);
  // }, [id]);

  return (
    <div className="page">
      <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml>
        {markdown}
      </ReactMarkdownWithHtml>
    </div>
  );
}
