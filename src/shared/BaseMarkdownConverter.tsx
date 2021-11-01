import React, { useEffect, useState } from 'react';
import marked from 'marked';
import dompurify from 'dompurify';
import axios from 'axios';

interface BaseMarkdownConverterProps {
  url: string;
}

export default function BaseMarkdownConverter({ url }: BaseMarkdownConverterProps) {
  const [markdown, setMarkdown] = useState('');

  const init = async () => {
    const markdown = await axios.get<string>(url).then(({ data }) => data);
    setMarkdown(markdown);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(markdown, { sanitizer: (dirty) => dompurify.sanitize(dirty) }),
      }}
      className="markdown-content"
    ></div>
  );
}
