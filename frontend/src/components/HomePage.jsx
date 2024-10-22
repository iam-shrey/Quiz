import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css'
import logo1 from '../assets/js.jpg';
import logo2 from '../assets/java.png';
import logo3 from '../assets/python.png';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div>
            <p className='p1'>Welcome to <span>Quizzify</span></p>
            <p className='p2'>Let's Take A Quiz !</p>
            <div className='container img-container'>
                <div className='image'>
                    <img src={logo1} alt="" onClick={()=>navigate('/quiz/1')}></img>
                </div>
                <div className='image'>
                    <img src={logo2} alt="" onClick={()=>navigate('/quiz/2')}></img>
                </div>
                <div className='image'>
                    <img src={logo3} alt="" onClick={()=>navigate('/quiz/3')}></img>
                </div>
            </div>
            <p className='p3'>Pick Any One</p>
        </div>
    )
}

export default HomePage;