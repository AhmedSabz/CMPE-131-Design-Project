// Survey.js
import React, { useState } from 'react';
import './Survey.css';

/*

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
*/

const QuestionForm = () => {
  const [subjects, setSubjects] = useState(['', '', '']);
  const [hobbies, setHobbies] = useState(['', '', '']);
  const [playsSports, setPlaysSports] = useState('');
  const [sportPlayed, setSportPlayed] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubjectChange = (index, value) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects];
      updatedSubjects[index] = value;
      return updatedSubjects;
    });
  };

  const handlePlaysSportsChange = (value) => {
    setPlaysSports(value);
    if (value === 'no') {
      setSportPlayed('');
    }
  };

  const handleHobbyChange = (index, value) => {
    setHobbies((prevHobbies) => {
      const updatedHobbies = [...prevHobbies];
      updatedHobbies[index] = value;
      return updatedHobbies;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log('Form submitted:', { subjects, hobbies, playsSports, sportPlayed });
    setSubjects(['', '', '']);
    setHobbies(['', '', '']);
    setPlaysSports('');
    setSportPlayed('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000); // Reset the form after 3 seconds
  };

  return (
    <form className='form-contain' onSubmit={handleSubmit}>
      <label className='question-row'>
        What are your 3 favorite school subjects?
        {subjects.map((subject, index) => (
          <input
            className='survey-answers'
            key={index}
            type="text"
            value={subject}
            onChange={(e) => handleSubjectChange(index, e.target.value)}
          />
        ))}
      </label>
      <br />
      <br />
      <label className='question-row'>
        What are 3 of your favorite hobbies?
        {hobbies.map((hobby, index) => (
          <input
            className='survey-answers2'
            key={index}
            type="text"
            value={hobby}
            onChange={(e) => handleHobbyChange(index, e.target.value)}
          />
        ))}
      </label>
      <br />
      <br />
      <label className='question-row'>
        Do you play sports?
        <select className='sport-dec' value={playsSports} onChange={(e) => handlePlaysSportsChange(e.target.value)}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <br />
      <br />
      {playsSports === 'yes' && (
        <label className='question-row'>
          Which sport do you play?
          <input
            className='what-sport'
            type="text"
            value={sportPlayed}
            onChange={(e) => setSportPlayed(e.target.value)}
          />
        </label>
      )}
      <br />
      <br />
      <button className='submit-button' type="submit">Submit</button>
    </form>
  );
};


//export default Survey;
export default QuestionForm;