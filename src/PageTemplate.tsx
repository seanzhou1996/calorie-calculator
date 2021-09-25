import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

function PageTemplate({ title, children }: Props) {
  return (
    <div className="page">
      <header>
        <div className="width-container">
          <h1 className="title">{title}</h1>
        </div>
      </header>

      <div className="content">
        { children }
      </div>

      <footer>
        <span>
          © Sean Zhou
        </span>
      </footer>
    </div>
  );
}

export default PageTemplate;
