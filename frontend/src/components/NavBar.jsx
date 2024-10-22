import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css';

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navdiv">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand" onClick={()=>navigate('/')}>Quizzify</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                        <i className="fa-solid fa-house"></i>
                            <a className="nav-link" onClick={()=>navigate('/')}>Home </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link quizbutton" onClick={()=>navigate('/admin')}>Admin Panel</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;