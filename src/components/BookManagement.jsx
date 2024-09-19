import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import BookList from './BookList';
import DeleteBook from './DeleteBook';

const BookManagement = () => {
  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (bookData) => {
    try {
      await axios.post('/api/books', bookData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchBooks();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchBooks();
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  };

  return (
    <div>
      <h2>Gestion des livres</h2>
      <BookForm onSave={handleAddBook} />
      <BookList books={books} />
      {books.map(book => (
        <DeleteBook key={book.id} bookId={book.id} onDelete={handleDeleteBook} />
      ))}
    </div>
  );
};

export default BookManagement;