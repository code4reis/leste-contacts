import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const HomePage = () => {
  
  return (
    <div style={{ backgroundColor: '#EBEBEB', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={logo} alt="Logo" style={{ maxWidth: '300px', maxHeight: '200px', marginBottom: '20px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to = "/contatos" >
          <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Lista de contatos</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;