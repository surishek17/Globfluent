import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import QuizResult from '../components/QuizResult';

const ResultPage = () => {
  const [quizzes] = useLocalStorage('quizzes', []);
  const [answers] = useLocalStorage('quizAnswers', []);
  const [currentQuiz] = useState(quizzes[0] || null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Review Answers</h1>
      {currentQuiz && <QuizResult questions={currentQuiz.questions} answers={answers} />}
    </div>
  );
};

export default ResultPage;

