import { useState } from 'react'
import './App.css'
import { useGetBooks } from './services/useGetBooks';
import { Book } from './types';
import { BookCard } from './components/BookCard';


function App() {
  const getBooks = useGetBooks();
  const [books, setBooks] = useState([])
  const [searchPhrase, setSearchPhrase] = useState('')
  


  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(event.target.value)
  }

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
      <input type="text"
        id="searchInput"
        onChange={onChange}
        value={searchPhrase}
        placeholder="Enter book title"></input>
      <button onClick={() => onClick()}>Search</button>

      <div>
        <h2>Search Results:</h2>
        <ul>
          {books.map((book: Book) => (
            <BookCard key={book.id} 
            volInfo={book.volumeInfo} /> 
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
