import React, { useState } from 'react';

const AdicionarContato = ({ onAdicionarContato }) => {
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [contato, setContato] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    language: '',
    birthday: '',
  });
  const [camposVazios, setCamposVazios] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContato((prevContato) => ({
      ...prevContato,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se há campos vazios
    if (
      contato.first_name === '' ||
      contato.last_name === '' ||
      contato.email === '' ||
      contato.gender === '' ||
      contato.language === ''
    ) {
      setCamposVazios(true);
      return; // Impede a adição do contato
    }

    onAdicionarContato(contato);
    setContato({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
      language: '',
      birthday: '',
    });
    setCamposVazios(false); // Reinicia o estado de campos vazios
  };

  const toggleExibirFormulario = () => {
    setExibirFormulario((prevExibirFormulario) => !prevExibirFormulario);
    setCamposVazios(false); // Reinicia o estado de campos vazios ao exibir/ocultar o formulário
  };

  return (
    <div>
      {exibirFormulario ? (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #12A146', padding: '10px'}}>
          {camposVazios && <p style={{ color: 'red' }}>Preencha todos os campos.</p>}
          <div>
            <label>Nome:</label>
            <input type="text" name="first_name" value={contato.first_name} onChange={handleInputChange} />
          </div>
          <div>
            <label>Sobrenome:</label>
            <input type="text" name="last_name" value={contato.last_name} onChange={handleInputChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={contato.email} onChange={handleInputChange} />
          </div>
          <div>
            <label>Gênero:</label>
            <input type="text" name="gender" value={contato.gender} onChange={handleInputChange} />
          </div>
          <div>
            <label>Idioma:</label>
            <input type="text" name="language" value={contato.language} onChange={handleInputChange} />
          </div>
          <div>
            <label>Nascimento:</label>
            <input type="text" name="birthday" value={contato.birthday} onChange={handleInputChange} />
          </div>
          <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} type="submit">Salvar</button>
          <button style={{ backgroundColor: '#C00000', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={toggleExibirFormulario}>Cancelar</button>
        </form>
      ) : (
        <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '254px', marginLeft: '0px', marginTop: '25px', marginBottom: '5px'}} onClick={toggleExibirFormulario}>Adicionar Contato</button>
      )}
    </div>
  );
};

export default AdicionarContato;
