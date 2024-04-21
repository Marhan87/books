import React, { useState } from "react";
import { useGetBooks } from "../../services/useGetBooks";
import { Book } from "../../types";
import { BookCard } from "../BookCard/BookCard";
import { InputField } from "../InputField/InputField";

export const BookSearch = () => {
    const getBooks = useGetBooks();
    const [books, setBooks] = useState<Book[]>([]);

    const [searchPhrase, setSearchPhrase] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(event.target.value);
    };

    const onClick = async () => {
        const data = await getBooks(searchPhrase);
        if (data) {
            setBooks(data.items);
            console.log(data.items);
        }
    };

    return (
        <>
            <label htmlFor="searchInput">Search Books: </label>
            <InputField onChange={onChange} searchPhrase={searchPhrase} placeHolder="Enter book title" />
            <button onClick={onClick}>Search</button>

            <div>
                <h2>Search Results:</h2>
                <ul>
                    {books.map((book: Book) => (
                        <BookCard key={book.id} volInfo={book.volumeInfo} />
                    ))}
                </ul>
            </div>
        </>
    );
};