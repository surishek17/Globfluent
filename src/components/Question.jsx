import React from 'react';

const Question = ({ question, onChange }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-4">{question.question}</h2>
      {question.options.map((option, index) => (
        <label key={index} className="block mb-2">
          <input
            type="radio"
            name={`question-${question.id}`}
            value={index}
            onChange={() => onChange(index)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Question;
