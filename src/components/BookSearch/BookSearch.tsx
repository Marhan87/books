import React, { useState } from "react";
import { useGetBooks } from "../../services/useGetBooks";
import { Book } from "../../types";
import { InputField } from "../InputField/InputField";
import { BookCard } from "../BookCard/BookCard";
import { Modal } from "../BookModal/Modal";

export const BookSearch = () => {
    const getBooks = useGetBooks();
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(event.target.value);
    };

    const bookSearch = async () => {
        setBooks([])
        setLoading(true);
        const data = await getBooks(searchPhrase);
        if (data) {
            setBooks(data.items);
            console.log(data.items);
            setLoading(false)
        }
    };

    const openModal = (book: Book) => {
        setShowModal(true);
        setModalContent(book);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    return (
        <>
            <label htmlFor="searchInput">Search Books: </label>
            <InputField onChange={onChange} searchPhrase={searchPhrase} placeHolder="Enter book title" />
            <button onClick={bookSearch}>Search</button>

            <div>
                <h2>Search Results:</h2>
                {loading ? <img src="./src/assets/loading.gif" /> : null}
                <div>
                    {books.map((book) => (
                        <BookCard key={book.id} volInfo={book.volumeInfo} onCardClick={() => openModal(book)} />
                    ))}

                    <Modal showModal={showModal} closeModal={closeModal} volInfo={modalContent?.volumeInfo} />
                </div>
            </div>
        </>
    );
};