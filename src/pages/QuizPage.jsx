import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Quiz from '../components/Quiz';
import QuizResult from '../components/QuizResult';

const QuizPage = () => {
  const [quizzes] = useLocalStorage('quizzes', []);
  const [currentQuiz, setCurrentQuiz] = useState(quizzes[0] || null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useLocalStorage('quizAnswers', []);

  const handleQuizSubmit = (submittedAnswers) => {
    setAnswers(submittedAnswers);
    setShowResult(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Take Quiz</h1>
      {currentQuiz && !showResult && (
        <Quiz questions={currentQuiz.questions} onQuizSubmit={handleQuizSubmit} />
      )}
      {showResult && <QuizResult questions={currentQuiz.questions} answers={answers} />}
    </div>
  );
};

export default QuizPage;

