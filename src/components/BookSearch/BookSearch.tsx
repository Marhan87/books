import React, { useState, useCallback } from "react";
import { useGetBooks } from "../../services/useGetBooks";
import { Book } from "../../types";
import { InputField } from "../InputField/InputField";
import { BookCard } from "../BookCard/BookCard";
import { Modal } from "../BookModal/Modal";
import ErrorBoundary from "../../utils/errorBoundary";
import styles from "./BookSearch.module.scss";
import Pagination from "../pagination/Pagination";

export const BookSearch = () => {
    const getBooks = useGetBooks();
    const [books, setBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [previousSearchPhrase, setPreviousSearchPhrase] = useState('')
    const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
    const [sortBy, setSortBy] = useState('title');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const bookSearch = useCallback(async (searchPhrase: string, startIndex: number) => {
        setBooks([]);
        setLoading(true);
        const data = await getBooks(searchPhrase, startIndex);
        if (data) {
            const books = data.items;
            setTotalPages(Math.floor((data.totalItems / 10) - 1))
            sortBooks(sortBy, books)
            setLoading(false);
            setErrorBoundaryKey((prevKey) => prevKey + 1);
        }
    }, [getBooks, sortBy]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPhrase(event.target.value);
    };

    const onClick = () => {
        if (!searchPhrase) {
            setError("Please enter a search term.");
        } else {
            setError(null); 
            bookSearch(searchPhrase, 1);
            setPreviousSearchPhrase(searchPhrase);
            setCurrentPage(1);
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

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            bookSearch(previousSearchPhrase, Math.floor(currentPage * 10))
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            bookSearch(previousSearchPhrase, Math.floor((currentPage - 1) / 10))
        }
    };

    const sortBooks = (value: string, books: Book[]) => {

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

            <section className={styles.bookSearchContainer}>
                <div className={styles.bookSearchHeader}>
                <h3>Search Results:</h3>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.sortBy}>
                        <label htmlFor="sortBy">Sort by:</label>
                        <select name="sortBy" value={sortBy} onChange={(e) => sortBooks(e.target.value, books)}>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                        </select>
                    </div>
                </div>
                {loading ? <img alt="loading image" className={styles.loadingImage} width="150" src="./src/assets/loading.gif" /> : null}
                <ErrorBoundary key={errorBoundaryKey}>
                    <div className={styles.booksContainer}>
                        {books.map((book) => (
                            <BookCard key={book.id} volInfo={book.volumeInfo} onCardClick={() => openModal(book)} />
                        ))}
                        <Modal showModal={showModal} closeModal={closeModal} volInfo={modalContent?.volumeInfo} />
                    </div>
                    {books.length > 0 ?
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onNextPage={nextPage}
                            onPrevPage={prevPage}
                        />
                        : null}
                </ErrorBoundary>
                
            </section>
        </>
    );
};
