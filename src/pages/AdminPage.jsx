import React, { useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AdminPage = () => {
  const [quizzes, setQuizzes] = useLocalStorage('quizzes', []);

  const handleSaveQuiz = (questions) => {
    setQuizzes([...quizzes, { id: quizzes.length, questions }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <AdminPanel onSaveQuiz={handleSaveQuiz} />
    </div>
  );
};

export default AdminPage;

