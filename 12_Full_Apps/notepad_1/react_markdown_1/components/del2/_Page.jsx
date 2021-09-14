import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
// import useGetPage from './custom_hooks/-useGetPage';
import useGetMarkdown from './custom_hooks/useGetMarkdown';
// import readPageRequest from './utils/readPageRequest';

export default function Page() {
  const { id } = useParams();
  const [markdown] = useGetMarkdown(id);
  // const [page, setPage] = useState('');
  // useEffect(() => {
  //   const data = readPageRequest(id);
  //   setPage(data);
  // }, [id]);

  return (
    <div className="page">
      <ReactMarkdownWithHtml plugins={[gfm]} allowDangerousHtml>
        {markdown}
      </ReactMarkdownWithHtml>
    </div>
  );
}
