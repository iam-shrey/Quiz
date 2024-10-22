import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/QuizPage.css'; // Custom CSS for extra styling

const QuizPage = ({ quizId }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // To track which question is shown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState([]); // To store user responses
  const [isSubmitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const [quizRes, questionsRes] = await Promise.all([
          axios.get(`http://localhost:8765/quiz-service/quiz/${quizId}`),   // Fetch title
          axios.get(`http://localhost:8765/quiz-service/quiz/getQuestions/${quizId}`) // Fetch questions
        ]);
        const mS = await axios.post("http://localhost:8090/quiz/getMaxScore", questionsRes.data)
        setMaxScore(mS.data);
        setQuizTitle(quizRes.data.title);
        setQuestions(questionsRes.data); // Assuming 'questions' is an array
        setLoading(false);
      } 
      catch (err) {
        setError('Failed to load quiz data');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleOptionSelect = (questionId, optionText) => {
    // Update or add the selected response for the current question
    setResponses(prevResponses => {
      const updatedResponses = prevResponses.filter(resp => resp.id !== questionId);
      return [...updatedResponses, { id: questionId, response: optionText }];
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = (score) => {
    // Post the final responses to the backend
      axios.post(`http://localhost:8090/quiz/submit`, responses)
      .then(response => {
        setScore(response.data);
        setSubmitted(true);
      })
      .catch(e => {
        alert('Error submitting quiz');
      });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5 quizbody">
      <h1 className="text-center mb-4">{quizTitle}</h1>

      {/* Display the current question */}
      <div key={currentQuestion.id} className="card shadow p-4 mb-4">
            <div>
            <ul className="question-ul">
              <li key={currentQuestion.id} className="question-item">
                <span className="question-text">{currentQuestion.questionTitle}</span>
                <span className="difficulty-text">
                     (Difficulty:&nbsp;&nbsp;
                </span>
                <span className="difficulty-text" style={{ color: getDifficultyColor(currentQuestion.difficultylevel) }}>
                     {currentQuestion.difficultylevel}
                </span>
                <span className="difficulty-text">
                     )
                </span>
              </li>
            </ul>
            </div>
          {/* <h3 className="mb-4">{currentQuestion.questionTitle}</h3> */}
          {/* <div style={{ backgroundColor: currentQuestion.difficultylevel === 'easy' ? 'green' : currentQuestion.difficultylevel === 'medium' ? 'yellow' : 'red' }}>
    {currentQuestion.questionTitle} */}
        {/* <h3 className="mb-4">{currentQuestion.questionTitle}</h3>
        <div className="alert alert-success msg" role="alert"><p>{currentQuestion.difficultylevel}</p></div> */}

        {/* Display the 4 options with enhanced spacing and styling */}
        <div className="options mb-2">
          <div className="form-check option-container mb-3">
            <label className="form-check-label option-label">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${currentQuestion.id}`}
                value={currentQuestion.option1}
                checked={responses[currentQuestion.id] === currentQuestion.option1}
                onChange={() => handleOptionSelect(currentQuestion.id, currentQuestion.option1)}
              />
              {currentQuestion.option1}
            </label>
          </div>
          <div className="form-check option-container mb-3">
            <label className="form-check-label option-label">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${currentQuestion.id}`}
                value={currentQuestion.option2}
                checked={responses[currentQuestion.id] === currentQuestion.option2}
                onChange={() => handleOptionSelect(currentQuestion.id, currentQuestion.option2)}
              />
              {currentQuestion.option2}
            </label>
          </div>
          <div className="form-check option-container mb-3">
            <label className="form-check-label option-label">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${currentQuestion.id}`}
                value={currentQuestion.option3}
                checked={responses[currentQuestion.id] === currentQuestion.option3}
                onChange={() => handleOptionSelect(currentQuestion.id, currentQuestion.option3)}
              />
              {currentQuestion.option3}
            </label>
          </div>
          <div className="form-check option-container mb-3">
            <label className="form-check-label option-label">
              <input
                type="radio"
                className="form-check-input"
                name={`question-${currentQuestion.id}`}
                value={currentQuestion.option4}
                checked={responses[currentQuestion.id] === currentQuestion.option4}
                onChange={() => handleOptionSelect(currentQuestion.id, currentQuestion.option4)}
              />
              {currentQuestion.option4}
            </label>
          </div>
        </div>
      </div>

      {/* Navigation and Submit buttons */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        {isSubmitted && <div className="alert alert-success msg" role="alert"><p>Your Quiz is Submitted!, Final Score = {score}/{maxScore}</p></div>}
        {currentQuestionIndex < questions.length - 1 ? (
          <button className="btn btn-primary ml-2" onClick={nextQuestion}>
            Next
          </button>
        ) : (
          <button className="btn btn-success ml-2" onClick={handleSubmitQuiz}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

const getDifficultyColor = (level) => {
  switch (level) {
      case 'Easy':
          return 'green';  // Set color for Easy
      case 'Medium':
          return 'orange'; // Set color for Medium
      case 'Hard':
          return 'red';    // Set color for Hard
      default:
          return 'gray';   // Default color if level is unknown
  }
};


export default QuizPage;