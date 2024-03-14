import React, { useEffect, useState } from 'react';
import AdicionarContato from '../adicionarContato/addContact';
import logo from '../../assets/logo.png';
import addUser from '../../assets/icons/addUser.svg';
import searchUser from '../../assets/icons/search.svg'

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
        const response = await fetch('https://my.api.mockaroo.com/users.json?key=7ce8e6d0');
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
    <main className='container'>
      <div className='contactDetails'>
        <div className='header'>
          <img src={logo} alt="Leste Contacts" className='logo' />
          <div className='orgHeader'>
            <img className='addUser' src={addUser} onClick={handleAdicionarContato}></img>
            <input class="form-control" value={buscaContato} onChange={handleBuscaInputChange} onKeyDown={handleSearchKeyPress} placeholder="Buscar usuário..." />
            <img className='searchUser' src={searchUser}></img>
          </div>
        </div>

        {contatos
          .filter((contato) =>
            contato.first_name.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
            contato.last_name.toLowerCase().includes(termoPesquisa.toLowerCase())
          )
          .map((contato) => (
            <div
              key={contato.id}
            >
              <div className='detailsContact'>
                {contatoDetalhes && contatoDetalhes.id === contato.id ? (
                  <>
                    {isEditing ? (
                      <>
                        {camposVazios && <p style={{ color: 'red' }}>Preencha todos os campos.</p>}
                        <div>
                          <button onClick={handleSalvarEdicao}>Salvar</button>
                        </div>
                        <div className='detail'>
                          <label>Nome: </label>
                          <input type="text" value={contatoDetalhes.first_name} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, first_name: event.target.value })} />
                        </div>
                        <div className='detail'>
                          <label>Sobrenome: </label>
                          <input type="text" value={contatoDetalhes.last_name} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, last_name: event.target.value })} />
                        </div>
                        <div className='detail'>
                          <label>E-Mail: </label>
                          <input type="text" value={contatoDetalhes.email} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, email: event.target.value })} />
                        </div>
                        <div className='detail'>
                          <label>Gênero: </label>
                          <input type="text" value={contatoDetalhes.gender} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, gender: event.target.value })} />
                        </div>
                        <div className='detail'>
                          <label>Idioma: </label>
                          <input type="text" value={contatoDetalhes.language} onChange={(event) => setContatoDetalhes({ ...contatoDetalhes, language: event.target.value })} />
                        </div>
                        {/* campos de edição */}

                      </>
                    ) : (
                      <div className='contactDetails'>
                         <div className='detail'>
                            <label>Nome:</label>
                            <span>{contatoDetalhes.first_name}</span>
                          </div>
                          <div className='detail'>
                            <label>Sobrenome: </label>
                            <span>{contatoDetalhes.last_name}</span>
                          </div>
                          <div className='detail'>
                            <label>E-mail:</label>
                            <span>{contatoDetalhes.email}</span>
                          </div>
                          <div className='detail'>
                            <label>Gênero: </label>
                            <span>{contatoDetalhes.gender}</span>
                          </div>
                          <div className='detail'>
                            <label>Idioma:</label>
                            <span>{contatoDetalhes.language}</span>
                          </div>
                          <div>
                            <button onClick={handleFecharDetalhes}>Fechar</button>
                          </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* <strong>{contato.id} - </strong> */}
                    <div className='orgList'>
                      <img className='imagemAvatar' src={contato.avatar} alt="Avatar" />
                      <h5>{contato.first_name} {contato.last_name}</h5>
                    </div>
                    <div className='orgBtn'>
                      <button type="button" class="btn btn-success btnDetail" onClick={() => setContatoDetalhes(contato)}>Detalhes</button>
                      {/* <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={() => handleEditarClick(contato.id)}>Editar</button> */}
                      {/* <button style={{ backgroundColor: '#12A146', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', marginLeft: '0px', marginTop: '10px', marginBottom: '10px'}} onClick={() => handleExcluirClick(contato.id)}>Excluir</button> */}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default ListaContatos;
