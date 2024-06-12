import React from 'react';

const QuizResult = ({ questions, answers }) => {
  const score = answers.filter((answer, index) => answer === questions[index].answer).length;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="mb-4">Your score: {score} / {questions.length}</p>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <h3 className="text-xl">{question.question}</h3>
          {question.options.map((option, oIndex) => (
            <div
              key={oIndex}
              className={`p-2 transition duration-500 ease-in-out transform ${oIndex === question.answer ? 'bg-green-200' : ''} ${oIndex === answers[qIndex] && oIndex !== question.answer ? 'bg-red-200' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizResult;

