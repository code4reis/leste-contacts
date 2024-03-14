import React, { useState } from 'react';

const AddContact = ({ onSave, onCancel, newUserImage }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      first_name: firstName,
      last_name: lastName,
      birthday,
      gender,
      language,
      email,
      avatar: newUserImage
    };
    const confirmCreation = window.confirm("Tem certeza de que deseja adicionar este contato?");
    if (confirmCreation) {
      onSave(newContact);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="addContactForm">
      <div className='modalDiv'>
        <h2>Adicionar Contato</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Sobrenome:</label>
            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Data de Nascimento:</label>
            <input type="date" className="form-control" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Gênero:</label>
            <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="Male">Masculino</option>
              <option value="Female">Feminino</option>
              <option value="Other">Outro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Idioma:</label>
            <input type="text" className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <br></br>
          <div className='orgBtnAdd'>
          <button type="submit" className="btn btn-success">Adicionar</button>
          <button className='btn btn-danger' onClick={handleCancel} >Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
