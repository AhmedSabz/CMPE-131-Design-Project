// Survey.js
import React, { useState } from 'react';
import './Survey.css';

const Survey = ({ onSurveySubmit }) => {
  const [answers, setAnswers] = useState({
    interest1: '',
    interest2: '',
    interest3: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSurveySubmit callback with the survey answers
    onSurveySubmit(answers);
  };

  return (
    <div>
      <h2>Take the Survey</h2>
      <form onSubmit={handleSubmit}>
        <label className='survey-label'>
          Interest 1:
          <input className="survey-input" type="text" name="interest1" value={answers.interest1} onChange={handleChange} />
        </label>
        <label className='survey-label'>
          Interest 2:
          <input className="survey-input" type="text" name="interest2" value={answers.interest2} onChange={handleChange} />
        </label>
        <label className='survey-label'>
          Interest 3:
          <input className="survey-input" type="text" name="interest3" value={answers.interest3} onChange={handleChange} />
        </label>
        <button className="survey-submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Survey;
