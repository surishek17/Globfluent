import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/quiz.css';  // Make sure to create and include relevant CSS for animations

const Quiz = ({ questions, onQuizSubmit }) => {
  const [answers, setAnswers] = useLocalStorage('quizAnswers', questions.map(() => -1));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
    setError('');
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === -1) {
      setError('Please select an answer before proceeding');
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setError('');
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmitQuiz = () => {
    if (answers.includes(-1)) {
      setError('Please answer all questions before submitting');
      return;
    }
    onQuizSubmit(answers);
  };

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      handleSubmitQuiz();
    }
  }, [currentQuestionIndex]);

  return (
    <div className="p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <TransitionGroup>
        <CSSTransition
          key={currentQuestionIndex}
          timeout={300}
          classNames="fade"
        >
          <div>
            <h2 className="text-xl mb-4">{questions[currentQuestionIndex].question}</h2>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={index}
                  checked={answers[currentQuestionIndex] === index}
                  onChange={() => handleAnswerChange(index)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
            <div className="mt-4">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePreviousQuestion}
                  className="bg-blue-500 text-white p-2 mr-2 transition-transform transform hover:scale-105"
                >
                  Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-500 text-white p-2 transition-transform transform hover:scale-105"
                >
                  Next
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-green-500 text-white p-2 transition-transform transform hover:scale-105"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Quiz;


