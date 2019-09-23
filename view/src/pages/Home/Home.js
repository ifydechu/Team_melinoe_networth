import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';


const Home=()=> {
    return (
        <div className='ui container'>
          <h1 className='ui centered header'>Welcome to Net-worth Calculator</h1>

          <div className='buttons'>
            <Link to='/login' className='home_btn'>Login</Link>
            <Link to='/register' className='home_btn2'>Register</Link>
          </div>
        </div>
    )
}
export default Home;
