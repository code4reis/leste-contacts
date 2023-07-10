import React, { useEffect, useState } from 'react';
import AdicionarContato from '../adicionarContato';
import logo from '../../assets/logo.png';

const ListaContatos = () => {
  const [contatos, setContatos] = useState([]);
  const [contatoDetalhes, setContatoDetalhes] = useState(null);
  const [buscaContato, setBuscaContato] = useState('');
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false); // novo estado

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const response = await fetch('https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060');
        const data = await response.json();
        setContatos(data);
      } catch (error) {
        console.error('Erro ao obter os contatos:', error);
      }
    };

    fetchContatos();
  }, []);

  const handleAdicionarContato = (contato) => {
    setContatos((prevContatos) => [...prevContatos, contato]);
  };

  const handleEditarClick = (id) => {
    const contato = contatos.find((contato) => contato.id === id);
    setContatoDetalhes(contato);
    setIsEditing(true);
  };

  const handleExcluirClick = (id) => {
    const confirmarExclusao = window.confirm("Tem certeza que deseja excluir o contato?");
    if (confirmarExclusao) {
      console.log('Excluir contato:', id);
      setContatos((prevContatos) => prevContatos.filter((contato) => contato.id !== id));
    }
  };

  const handleBuscaInputChange = (event) => {
    setBuscaContato(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      setTermoPesquisa(buscaContato);
    }
  };

  const handleFecharDetalhes = () => {
    setContatoDetalhes(null);
    setIsEditing(false);
  };

  const handleSalvarEdicao = () => {
    // Verificar se há campos vazios
    if (
      contatoDetalhes.first_name === '' ||
      contatoDetalhes.last_name === '' ||
      contatoDetalhes.email === '' ||
      contatoDetalhes.gender === '' ||
      contatoDetalhes.language === ''
    ) {
      setCamposVazios(true);
      return; // Impede que a edição seja salva
    }

    setContatos((prevContatos) =>
      prevContatos.map((contato) =>
        contato.id === contatoDetalhes.id ? contatoDetalhes : contato
      )
    );
    setIsEditing(false);
    setCamposVazios(false); // Reinicia o estado de campos vazios
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', gap: '5px', backgroundColor: '#EBEBEB' }}>
      <img src={logo} alt="Logo" style={{ maxWidth: '150px', maxHeight: '150px', marginBottom: '0px', marginTop: '30px', marginLeft: '230px' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
        <AdicionarContato onAdicionarContato={handleAdicionarContato} />
        <input type="text" placeholder="Buscar por nome" value={buscaContato} style={{ marginTop: '40px', marginBottom:'5px'}} onChange={handleBuscaInputChange} onKeyPress={handleSearchKeyPress} />
      </div>

      {contatos
        .filter((contato) =>
          contato.first_name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
          contato.last_name.toLowerCase().includes(termoPesquisa.toLowerCase())
        )
        .map((contato) => (
          <div
            key={contato.id}
            style={{
              display: 'flex',
              border: contatoDetalhes && contatoDetalhes.id === contato.id ? '2px solid #0BE021' : '1px solid #12A146',
              padding: '10px'
            }}
          >
            <img src={contato.avatar} alt="Avatar" style={{ border: '1px solid #12A146', width: '100px', height: '100px', marginRight: '10px', marginTop: '4px' }} />
            <div>
              {contatoDetalhes && contatoDetalhes.id === contato.id ? (
                <>
                  {isEditing ? (
                    <>
                      {camposVazios && <p style={{ color: 'red' }}>Preencha todos os campos.</p>}
                      <div>
                        <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={handleSalvarEdicao}>Salvar</button>
                      </div>
                      <div>
                        <label>Nome: </label>
                        <input type="text" value={contatoDetalhes.first_name} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, first_name: event.target.value })} />
                      </div>
                      <div>
                        <label>Sobrenome: </label>
                        <input type="text" value={contatoDetalhes.last_name} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, last_name: event.target.value })} />
                      </div>
                      <div>
                        <label>E-Mail: </label>
                        <input type="text" value={contatoDetalhes.email} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, email: event.target.value})} />
                      </div>
                      <div>
                        <label>Gênero: </label>
                        <input type="text" value={contatoDetalhes.gender} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, gender: event.target.value})} />
                      </div>
                      <div>
                        <label>Idioma: </label>
                        <input type="text" value={contatoDetalhes.language} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, language: event.target.value})} />
                      </div>
                      {/* campos de edição */}
                      
                    </>
                  ) : (
                    <>
                      <div>
                        <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={handleFecharDetalhes}>Fechar</button>
                      </div>
                      <div>
                        <label>Nome: </label>
                        <span>{contatoDetalhes.first_name}</span>
                      </div>
                      <div>
                        <label>Sobrenome: </label>
                        <span>{contatoDetalhes.last_name}</span>
                      </div>
                      <div>
                        <label>E-mail: </label>
                        <span>{contatoDetalhes.email}</span>
                      </div>
                      <div>
                        <label>Gênero: </label>
                        <span>{contatoDetalhes.gender}</span>
                      </div>
                      <div>
                        <label>Idioma: </label>
                        <span>{contatoDetalhes.language}</span>
                      </div>
                      {/* Restante dos campos de detalhes */}
                    </>
                  )}
                </>
              ) : (
                <>
                  <strong>{contato.id} - </strong>
                  <strong>{contato.first_name} {contato.last_name}</strong>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={() => handleEditarClick(contato.id)}>Editar</button>
                    <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={() => setContatoDetalhes(contato)}>Detalhes</button>
                    <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={() => handleExcluirClick(contato.id)}>Excluir</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListaContatos;
