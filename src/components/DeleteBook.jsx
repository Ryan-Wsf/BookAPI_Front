import React from 'react';
import axios from 'axios';

const DeleteBook = ({ bookId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onDelete();
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  };

  return (
    <button onClick={handleDelete}>Supprimer</button>
  );
};

export default DeleteBook;