import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Liste des livres</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.publicationDate} - {book.author.name} (Né en {book.author.birthYear})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;