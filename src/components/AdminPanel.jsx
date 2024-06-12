import React, { useState } from 'react';

const AdminPanel = ({ onSaveQuiz }) => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: 0 }]);
  const [error, setError] = useState('');

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: 0 }]);
  };

  const validateQuiz = () => {
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim()) {
        setError(`Question ${i + 1} cannot be empty`);
        return false;
      }
      for (let j = 0; j < questions[i].options.length; j++) {
        if (!questions[i].options[j].trim()) {
          setError(`Option ${j + 1} in Question ${i + 1} cannot be empty`);
          return false;
        }
      }
    }
    setError('');
    return true;
  };

  const saveQuiz = () => {
    if (validateQuiz()) {
      onSaveQuiz(questions);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-4">
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder={`Question ${qIndex + 1}`}
            className="border p-2 mb-2 w-full"
          />
          {q.options.map((opt, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
              placeholder={`Option ${oIndex + 1}`}
              className="border p-2 mb-2 w-full"
            />
          ))}
          <select value={q.answer} onChange={(e) => handleAnswerChange(qIndex, parseInt(e.target.value, 10))} className="border p-2 w-full">
            {q.options.map((opt, oIndex) => (
              <option key={oIndex} value={oIndex}>
                {`Option ${oIndex + 1}`}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={addQuestion} className="bg-blue-500 text-white p-2 mr-2">Add Question</button>
      <button onClick={saveQuiz} className="bg-green-500 text-white p-2">Save Quiz</button>
    </div>
  );
};

export default AdminPanel;

