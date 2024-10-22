import React from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';

function Admin() {
    const navigate = useNavigate();

    return (
        <div className='admin'>
            <h3>Here you can create and access your own custom quizzes</h3>
            <div className="container adminbody">
                <button className='btn btn-warning' onClick={()=>navigate('/admin/create')}>Create Quiz</button>
            </div>
        </div>
    )
}

export default Admin;