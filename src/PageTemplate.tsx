import React from 'react';

interface Props {
  children: React.ReactNode;
}

function PageTemplate({ children }: Props) {
  return (
    <div className="page">
      { children }

      <footer>
        <span>
          © Sean Zhou
        </span>
      </footer>
    </div>
  );
}

export default PageTemplate;
