import Admin from './components/Admin';
import './App.css';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import CreateQuiz from './components/CreateQuiz';
import AdminLoginForm from './components/AdminLoginForm';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLoginSuccess = () => {
      setIsAuthenticated(true);
  };
  const handleLogout = () => {
      setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
          <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path="/quiz/:quizId" element={<QuizPageWrapper />} />
              <Route path="/admin" element={isAuthenticated ? (<Admin onLogout={handleLogout} />) : (<AdminLoginForm onLoginSuccess={handleLoginSuccess} />)}/>
              <Route path="/admin/create" element={<CreateQuiz/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

function QuizPageWrapper() {
  const { quizId } = useParams();
  return <QuizPage quizId={quizId} />;
}

export default App;