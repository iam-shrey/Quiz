import React, { useState } from 'react';
import '../styles/CreateQuiz.css';  // Import custom CSS for additional styles
import axios from 'axios';

function CreateQuiz() {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [numQ, setNumQ] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const Submit = (event)=>{
        event.preventDefault();  // Prevent default form submission
        setLoading(true);  // Show loading state
        setError(null); 
        axios.post('http://localhost:8090/quiz/create',{
            "categoryName" : category,
            "numQuestions" : `${numQ}`,
            "title" : title
        })
        .then((response) => {
            setIsSubmitted(true);
            console.log('Quiz created:', response.data);
          })
          .catch((err) => {
            console.error('Error creating quiz:', err);
            setError('Failed to create quiz. Please try again.');
          })
          .finally(() => {
            setLoading(false);  // Stop loading state
          });
    }


    return (
        <div className="container mt-5">
        <div className="card shadow-lg p-4">
            <h2 className="createPageHead mb-4 text-center">Create a Quiz</h2>
            <form className="form">
            <div className="form-group mb-3">
                <label htmlFor="categoryname" className="form-label">Category:</label>
                <select id="categoryname" name="categoryname" className="form-control" required onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                </select>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">Quiz Title:</label>
                <input onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" className="form-control" placeholder="Enter Quiz Title" required />
            </div>

            <div className="form-group mb-4">
                <label htmlFor="numquestions" className="form-label">Number of Questions:</label>
                <select id="numquestions" name="numquestions" className="form-control" required onChange={(e) => setNumQ(e.target.value)}>
                <option value="">Select number of questions</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isSubmitted && <div className="alert alert-success" role="alert"><p>Your Quiz is Successfully Created and Stored into Database!</p></div>}

            <div className="text-center">
                <button type="submit" onClick={Submit} className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default CreateQuiz;
