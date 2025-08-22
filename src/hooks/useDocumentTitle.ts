import { useEffect } from 'react';

const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    document.title = `C.O | ${title}`;
  }, [title]);
};

export default useDocumentTitle;
