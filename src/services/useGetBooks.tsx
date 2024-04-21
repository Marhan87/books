import { useCallback } from "react";
import { API_KEY } from "./API-key";

export const useGetBooks = () => {
    const getBooks = useCallback(async (searchTerm: string) => {
        try {
          const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`);
          const jsonBooksData = await data.json();
          return jsonBooksData;
        } catch (error) {
          console.error(error);
          return null;
        }
      }, []);
    
      return getBooks;
}