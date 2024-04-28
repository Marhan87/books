import React, { useState, useCallback } from "react";
import { useGetBooks } from "../../services/useGetBooks";
import { Book } from "../../types";
import { InputField } from "../InputField/InputField";
import { BookCard } from "../BookCard/BookCard";
import { Modal } from "../BookModal/Modal";
import ErrorBoundary from "../../utils/errorBoundary";
import styles from "./BookSearch.module.scss";

export const BookSearch = () => {
    const getBooks = useGetBooks();
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
    const [sortBy, setSortBy] = useState<string>('title');

    const bookSearch = useCallback(async () => {
        setBooks([]);
        setLoading(true);
        const data = await getBooks(searchPhrase);
        if (data) {
            const books = data.items;

            let sortedBooks = [...books];
            if (sortBy === 'title' ) {
                sortedBooks = sortedBooks.sort((a:Book, b:Book) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
            } else if (sortBy === 'author') {
                sortedBooks = sortedBooks.sort((a:Book, b:Book) => {
                    const authorA = a.volumeInfo.authors.join(', ');
                    const authorB = b.volumeInfo.authors.join(', ');
                    return authorA.localeCompare(authorB);
                });
            }
            setBooks(sortedBooks);
            setLoading(false);
            setErrorBoundaryKey((prevKey) => prevKey + 1);
        }
    }, [getBooks, searchPhrase, sortBy]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(event.target.value);
    };

    const onClick = () => {
        bookSearch();
    };

    const openModal = (book: Book) => {
        setShowModal(true);
        setModalContent(book);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    const sortBooks = (value: string) => {

            setSortBy(value)
            let sortedBooks = [...books];
            if (value === 'title' ) {
                sortedBooks = sortedBooks.sort((a:Book, b:Book) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));
            } else if (value === 'author') {
                sortedBooks = sortedBooks.sort((a:Book, b:Book) => {
                    const authorA = a.volumeInfo.authors.join(', ');
                    const authorB = b.volumeInfo.authors.join(', ');
                    return authorA.localeCompare(authorB);
                });
            }
            setBooks(sortedBooks);
    }
    

    return (
        <>
            <h2><label htmlFor="searchInput">Search Books: </label></h2>
            <InputField onClick={onClick} onChange={onChange} searchPhrase={searchPhrase} placeHolder="Enter book title" />

            <div className={styles.bookSearchContainer}>
                <div className={styles.bookSearchHeader}>
                <h3>Search Results:</h3>

                    <div className={styles.sortBy}>
                        <span>Sort by:</span>
                        <select value={sortBy} onChange={(e) => sortBooks(e.target.value)}>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                        </select>
                    </div>
                </div>
                {loading ? <img className={styles.loadingImage} width="150" src="./src/assets/loading.gif" /> : null}
                <ErrorBoundary key={errorBoundaryKey}>
                    <div className={styles.booksContainer}>
                        {books.map((book) => (
                            <BookCard key={book.id} volInfo={book.volumeInfo} onCardClick={() => openModal(book)} />
                        ))}
                        <Modal showModal={showModal} closeModal={closeModal} volInfo={modalContent?.volumeInfo} />
                    </div>
                </ErrorBoundary>
                
            </div>
        </>
    );
};
