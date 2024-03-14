import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

// Função que exibe a home page
const HomePage = () => {
  
  return (
    <div className='main'>
      <img src={logo} alt="Logo" className='logoHome'/>

      <div className='back'>
        <Link to = "/contatos" >
          <button className='toList'>Lista de contatos</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;