import { useCallback } from "react";
import { API_KEY } from "./API-key";

export const useGetBooks = () => {
    const getBooks = useCallback(async (searchTerm: string) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonBooksData = await response.json();
            return jsonBooksData;
        } catch (error: unknown) {
          if (error instanceof Error) {
              console.error("Error fetching books:", error.message);
          } else {
              console.error("Unknown error:", error);
          }
          return null;
        }
    }, []);

    return getBooks;
};