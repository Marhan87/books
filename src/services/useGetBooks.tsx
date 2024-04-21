import { useCallback } from "react";

export const useGetBooks = () => {
    const getBooks = useCallback(async (searchTerm: string) => {
        try {
          const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDsIbKSFnCPrNl2S-hmgmqL4FRq7BNKQV4`);
          const jsonBooksData = await data.json();
          return jsonBooksData;
        } catch (error) {
          console.error(error);
          return null;
        }
      }, []);
    
      return getBooks;
}