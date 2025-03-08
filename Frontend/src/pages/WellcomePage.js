import './pages.css'
import { Link, useNavigate } from "react-router-dom";
import {useEffect} from "react";



function WellcomePage(){
    const token  = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/dashboard');
        }
    }, [token, navigate]);

    return(
        token ? null :
            <div className="wellcome-header">
                <h4 className='wellcome'>WELLCOME</h4>
                <h5 className='to'>To</h5>
                <h1 className='brand'>QuickBid</h1>
                <p>Online auctions, where buyers bid for items over the internet, have become increasingly popular.</p>
                <div className="d-flex justify-content-around">
                    <button className = "signup">
                        <Link to="/signup" className='text-white text-decoration-none'>Sign Up</Link>
                    </button>
                    <button className = "signin">
                        <Link to="/signin" className='text-white text-decoration-none'>Sign In</Link>
                    </button>
                </div>
            </div>
    )
}

export default WellcomePage;