import { useEffect } from 'react';

const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = `FM | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
