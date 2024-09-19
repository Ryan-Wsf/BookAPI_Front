import React, { useState } from 'react';
import axios from 'axios';

const BookForm = ({ book, onSave }) => {
  const [title, setTitle] = useState(book ? book.title : '');
  const [publicationDate, setPublicationDate] = useState(book ? book.publicationDate : '');
  const [authorName, setAuthorName] = useState(book ? book.author.name : '');
  const [authorBirthYear, setAuthorBirthYear] = useState(book ? book.author.birthYear : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      title,
      publicationDate,
      author: {
        name: authorName,
        birthYear: authorBirthYear
      }
    };

    try {
      if (book) {
        await axios.put(`/api/books/${book.id}`, bookData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('/api/books', bookData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      onSave();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du livre', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre du livre"
        required
      />
      <input
        type="date"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
        required
      />
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Nom de l'auteur"
        required
      />
      <input
        type="number"
        value={authorBirthYear}
        onChange={(e) => setAuthorBirthYear(e.target.value)}
        placeholder="Année de naissance de l'auteur"
        required
      />
      <button type="submit">{book ? 'Modifier' : 'Ajouter'}</button>
    </form>
  );
};

export default BookForm;