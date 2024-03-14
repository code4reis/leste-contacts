import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import addUser from '../../assets/icons/addUser.svg';
import close from '../../assets/icons/close.svg';
import filtro from '../../assets/icons/filtro.svg';
import deleteUserIcon from '../../assets/icons/delete.svg';
import edit from '../../assets/icons/edit.svg';
import newUser from '../../assets/icons/user.jpg';
import AdicionarContato from '../adicionarContato/addContact';
import indexList from '../../assets/icons/index.svg';


function App() {
  const [users, setUsers] = useState([]); // Armazena a lista de usuários
  const [selectedUser, setSelectedUser] = useState(null); // Armazena o usuário selecionado para exibição de detalhes
  const [searchBirthday, setSearchBirthday] = useState(''); //Armazena o valor da busca por ANIVERSARIO
  const [filterByMonth, setFilterByMonth] = useState(false); //Armazena o valor do filtro por MES
  const [filterByGender, setFilterByGender] = useState(''); //Armazena o valor do filtro por GENERO
  const [filterByName, setFilterByName] = useState(false); //Armazena o valor do filtro por NOME
  const [filterByLanguage, setFilterByLanguage] = useState(false); //Armazena o valor do filtro por IDIOMA
  const [filterByAge, setFilterByAge] = useState(false); // Armazena o valor do filtro por IDADE
  const [showAddContact, setShowAddContact] = useState(false); //Controla a exibição do formulário para adicionar contato
  const [isEditing, setIsEditing] = useState(false); //Indica se o usuário está atualmente editando um contato existente
  const [editedContact, setEditedContact] = useState(null); //Armazena as informações do contato sendo editado
  const [userCountByGender, setUserCountByGender] = useState({}); //Armazena contagem de usuários por gênero
  const [userCountByLanguage, setUserCountByLanguage] = useState({}); //Armazena contagem de usuários por idioma
  const [isRotated, setIsRotated] = useState(false); //Controla a rotação do botão que exibe a lista estática
  const [isReversed, setIsReversed] = useState(false); //Reverte a rotação aplicada ao clicar no botão que exibe a lista estática

// Busca e armazena os filtros e conta os usuários ao iniciar a aplicação
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedUsers = JSON.parse(localStorage.getItem('users'));
        if (savedUsers) {
          setUsers(savedUsers);
        } else {
          const response = await fetch('https://my.api.mockaroo.com/api_leste.json?key=7ce8e6d0');
          const data = await response.json();
          setUsers(data);
          localStorage.setItem('users', JSON.stringify(data));
        }

        const savedFilterSettings = JSON.parse(localStorage.getItem('filterSettings'));
        if (savedFilterSettings) {
          setFilterByMonth(savedFilterSettings.filterByMonth);
          setFilterByGender(savedFilterSettings.filterByGender);
          setFilterByName(savedFilterSettings.filterByName);
          setFilterByLanguage(savedFilterSettings.filterByLanguage);
          setFilterByAge(savedFilterSettings.filterByAge);
          setSearchBirthday(savedFilterSettings.searchBirthday);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    CountUsers();
  }, []);

// Armazena os filtros selecionados com a aplicação aberta
  useEffect(() => {
    const filterSettings = {
      filterByMonth,
      filterByGender,
      filterByName,
      filterByLanguage,
      filterByAge,
      searchBirthday
    };
    localStorage.setItem('filterSettings', JSON.stringify(filterSettings));
  }, [filterByMonth, filterByGender, filterByName, filterByLanguage, filterByAge, searchBirthday]);

// Exibe os detalhes do usuaŕio
  const showDetails = user => {
    setSelectedUser(user);
    const element = document.getElementById('showContactDetail');
    if (element) {
      element.style.display = 'flex';
    }
  };

// Fecha a exibição dos detalhes do usuário
  const closeDetails = () => {
    document.getElementById('showContactDetail').style.display = 'none';
  };

// Exibe o painel para escolher o filtro
  const searchFilter = () => {
    document.getElementById('filter').style.display = 'flex';
  };

// Fecha o painel para escolher o filtro e reseta todos os filtros para o estado inicial
  const closeFilter = () => {
    document.getElementById('filter').style.display = 'none';
    setSearchBirthday('');
    setFilterByMonth(false);
    setFilterByGender('');
    setFilterByName(false);
    setFilterByLanguage(false);
    setFilterByAge(false);
  };

// Altera o filtro para buscar por nome
  const changeNameFilter = () => {
    setFilterByName(!filterByName);
  };

// Altera o filtro para buscar por gênero
  const changeGender = () => {
    const checkGender = document.getElementById('searchByGender');
    if (checkGender.checked) {
      document.getElementById('selectGender').style.display = 'block';
    } else {
      document.getElementById('selectGender').style.display = 'none';
    }
  };

// Altera o filtro para buscar por idioma
  const changeLanguageFilter = () => {
    setFilterByLanguage(!filterByLanguage);
  };

// Altera o filtro para buscar por idade
  const changeAgeFilter = () => {
    setFilterByAge(!filterByAge);
  };

// Filtra os usuários com base nos filtros selecionados acima
  const filterUsersByBirthday = () => {
    //Inicializa a lista de usuários filtrada com todos os usuários
    let filteredUsers = users;
    // Verifica se o filtro por mês e a data de busca estão ativados
    if (filterByMonth && searchBirthday) {
      //Converte a data de busca em um objeto Date
      const searchDate = new Date(searchBirthday);
      //Obtém o número do mês da data de busca
      const searchMonth = searchDate.getMonth() + 1;
      //Filtra os usuários cujo mês de aniversário corresponde ao mês de busca
      filteredUsers = filteredUsers.filter(user => {
        const userDate = new Date(user.birthday);
        return userDate.getMonth() + 1 === searchMonth;
      });
    }
    //Verifica se o filtro por gênero está ativado
    if (filterByGender) {
      //Filtra os usuários com base no gênero especificado
      if (filterByGender === 'Other') {
        filteredUsers = filteredUsers.filter(user => user.gender !== 'Male' && user.gender !== 'Female');
      } else {
        filteredUsers = filteredUsers.filter(user => user.gender === filterByGender);
      }
    }
    //Verifica se o filtro por nome e a data de busca estão ativos
    if (filterByName && searchBirthday) {
      //FIltra os usuários cujo primeiro nome ou sobrenome contenham a string de busca
      filteredUsers = filteredUsers.filter(user => user.first_name.toLowerCase().includes(searchBirthday.toLowerCase()) || user.last_name.toLowerCase().includes(searchBirthday.toLowerCase()));
    }
    //Verifica se o filtro por idioma está ativado
    if (filterByLanguage) {
      //Filtra os usuários com base no idioma especificado
      filteredUsers = filteredUsers.filter(user => user.language.toLowerCase().includes(searchBirthday.toLowerCase()));
    }
    //Verifica se o filtro por idade e a data de busca estão ativados
    if (filterByAge && searchBirthday) {
      //Converte a idade da busca para número inteiro
      const age = parseInt(searchBirthday);
      //Obtém o ano atual
      const currentYear = new Date().getFullYear();
      //Calcula o ano de nascimento com base na idade fornecida
      const birthYear = currentYear - age;
      //Filtra os usuários cuja idade corresponde à idade fornecida
      filteredUsers = filteredUsers.filter(user => {
        const userYear = new Date(user.birthday).getFullYear();
        return currentYear - userYear === age;
      });
    }
    //Retorna a lista de usuários filtrada de acordo com os critérios
    return filteredUsers;
  };
  //Chama a função para obter a lista de usuários filtrada
  const filteredUsers = filterUsersByBirthday();

// Exclui um usuário selecioando
  const deleteUser = () => {
    if (selectedUser) {
      //Adicione um alerta para confirmar a exclusão do usuário
      const confirmDelete = window.confirm("Tem certeza de que deseja excluir este usuário?");
      if (confirmDelete) {
        const updatedUsers = users.filter(user => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setSelectedUser(null);
        document.getElementById('showContactDetail').style.display = 'none';
      }
    }
  };

// Adiciona um novo contato para a lista
  const saveNewContact = (newContact) => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    newContact.id = maxId + 1; // Atribuir o próximo ID disponível
    const updatedUsers = [...users, newContact];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setShowAddContact(false);
  };

// Cancela a criação de um novo contato
  const cancelAddContact = () => {
    setShowAddContact(false);
  };

// Prepara a edição para um usuário selecionado
  const handleEditarClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setEditedContact(user);
    const elementEdit = document.getElementById('showContactEdit');
    if (elementEdit) {
      elementEdit.style.display = 'flex';
    }
  };

// Salva a edição realizada e aplica ao usuário editado
  const handleSalvarEdicao = () => {
    const confirmarEdicao = window.confirm("Tem certeza que deseja salvar as alterações?");
    if (confirmarEdicao) {
      const updatedUsers = users.map(user => {
        if (user.id === editedContact.id) {
          return editedContact;
        }
        return user;
      });
      setUsers(updatedUsers);
      setIsEditing(false);
      setSelectedUser(null);
      setEditedContact(null);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

// Conta o número de usuários por gênero e idioma
  const CountUsers = () => {
    let filteredUsers = users;
    let genderCount = {};
    let languageCount = {};

    filteredUsers.forEach(user => {
      genderCount[user.gender] = (genderCount[user.gender] || 0) +1;
      languageCount[user.language] = (languageCount[user.language] || 0) +1;
    });

    setUserCountByGender(genderCount);
    setUserCountByLanguage(languageCount);
  }

// Exibe a lista estática contendo o número de usuários por gênero e idioma
  const showIndexList = () => {
    setIsRotated(!isRotated);
    setIsReversed(false);
    document.getElementById('listStaticIndex').style.display = "flex";
  }

// Fecha a lista estática contendo o número de usuários por gênero e idioma
  const closeIndexList = () => {
    document.getElementById('listStaticIndex').style.display = "none";
    setIsReversed(!isReversed);
    setIsRotated(false);
  }

// HTML
  return (
    <main className='container'>
      <div className='listContact'>
        <div className='header'>
          <img className='logo' alt='logo' src={logo}></img>
          <div className='headerFunctions'>
            <img className='addContact' alt='Adicionar Usuário' src={addUser} onClick={() => setShowAddContact(true)}></img>
            <input
              className="form-control"
              placeholder="Buscar Usuário..."
              onChange={e => setSearchBirthday(e.target.value)}
            />
            <img className='searchFilter' alt='Filtro' onClick={searchFilter} src={filtro}></img>
          </div>
          <div className='filter' id='filter'>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="name"
                id="searchByName"
                checked={filterByName}
                onChange={changeNameFilter}
              />
              <label className="form-check-label" htmlFor="searchByName">Nome</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="birthday"
                id="searchByBirthday"
                checked={filterByMonth}
                onChange={() => setFilterByMonth(!filterByMonth)}
              />
              <label className="form-check-label" htmlFor="searchByBirthday">Mês</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Age"
                id="searchByAge"
                checked={filterByAge}
                onChange={changeAgeFilter}
              />
              <label className="form-check-label" htmlFor="searchByAge">Idade</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="language"
                id="searchByLanguage"
                checked={filterByLanguage}
                onChange={changeLanguageFilter}
              />
              <label className="form-check-label" htmlFor="searchByLanguage">Idioma</label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                value="birthday"
                id='searchByGender'
                onChange={changeGender}
              />
              <label className='form-check-label' htmlFor='searchByGender'>Gênero</label>
            </div>
            <select id='selectGender' className="form-select" aria-label="Selecione o gênero" value={filterByGender} onChange={e => setFilterByGender(e.target.value)} >
              <option selected>Selecione o gênero</option>
              <option value="Male">Masculino</option>
              <option value="Female">Feminino</option>
              <option value="Other">Outros</option>
            </select>
            <img src={close} className='closeFilter' id='closeFilter' onClick={closeFilter} ></img>
          </div>

        </div>
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>
              <div className='orgList'>
                <div className='contact'>
                  <img className='imageDetail' src={user.avatar} alt="Avatar" />
                  <p className='nameDetail'>{user.first_name} {user.last_name}</p>
                  <p className='ageDetail'>{user.birthday}</p>
                  <p className='languageDetail'>{user.language}</p>
                  <p className='genderDetail'>{user.gender}</p>
                </div>
                <button type="button" className="btn btn-success btnDetail" onClick={() => showDetails(user)} >Detalhes</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div className="alert alert-success alert-dismissible fade show showContactDetail" id='showContactDetail' role="alert">
          <div className='img'>
            <img className='avatar' src={selectedUser.avatar} alt='Avatar' />
          </div>
          <div className='info'>
            <img className='close' alt='close' src={close} onClick={closeDetails} ></img>
            <p className='name'>Nome: {selectedUser.first_name} {selectedUser.last_name}</p>
            <p className='birthday'>Nascimento: {selectedUser.birthday}</p>
            <p className='gender'>Gênero: {selectedUser.gender}</p>
            <p className='idioma'>Idioma: {selectedUser.language}</p>
            <p className='email'>Email: {selectedUser.email}</p>
            <p className='id'>ID: {selectedUser.id}</p>
            <div className='orgUserBtns'>
              <img className='delete' id='deleteUser' alt='delete' src={deleteUserIcon} onClick={deleteUser}></img>
              <img className='edit' id='editUser' alt='edit' src={edit} onClick={() => handleEditarClick(selectedUser)} ></img>
            </div>
          </div>
        </div>
      )}
      {showAddContact && <AdicionarContato onSave={saveNewContact}  onCancel={cancelAddContact} newUserImage={newUser} />}
      {isEditing && editedContact && (
        <div className="alert alert-success alert-dismissible fade show showContactDetail" id='showContactEdit' role="alert">
          <div className='info'>
            <div className='formEditUser'>
              <label className='name'>Nome:</label>
              <input className='form-control' value={editedContact.first_name} onChange={e => setEditedContact({...editedContact, first_name: e.target.value})} />
            </div>
            <div className='formEditUser'>
              <label className='name'>Sobrenome:</label>
              <input className='form-control' value={editedContact.last_name} onChange={e => setEditedContact({...editedContact, last_name: e.target.value})} />
            </div>
            <div className='formEditUser'>
              <label className='birthday'>Nascimento:</label>
              <input className='form-control' value={editedContact.birthday} onChange={e => setEditedContact({...editedContact, birthday: e.target.value})} />
            </div>
            <div className='formEditUser'>
              <label className='gender'>Gênero:</label>
              <input className='form-control' value={editedContact.gender} onChange={e => setEditedContact({...editedContact, gender: e.target.value})} />
            </div>
            <div className='formEditUser'>
              <label className='idioma'>Idioma:</label>
              <input className='form-control' value={editedContact.language} onChange={e => setEditedContact({...editedContact, language: e.target.value})} />
            </div>
            <div className='formEditUser'>
              <label className='email'>Email:</label>
              <input className='form-control' value={editedContact.email} onChange={e => setEditedContact({...editedContact, email: e.target.value})} />
            </div>
            <div className='orgEditBtns'>
              <button className="btn btn-success" onClick={handleSalvarEdicao} >Salvar</button>
              <button className='btn btn-danger' onClick={() => setIsEditing(false)} >Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <div className='listGender' id='listStaticIndex' >
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeIndexList} ></button>
            <strong>Quantidade de Usuários por Gênero</strong>
          <ul>
            {Object.entries(userCountByGender).map(([gender, count]) => (
              <li key={gender}>{`${gender}: ${count}`}</li>
            ))}
          </ul>
          <strong>Quantidade de Usuários por Idioma</strong>
          <ul>
            {Object.entries(userCountByLanguage).map(([language, count]) => (
              <li key={language}>{`${language}: ${count}`}</li>
              ))}
          </ul>
        </div>
      </div>
      <img src={indexList} className={`staticList ${isRotated ? 'rotated' : ''}`} id='staticListBtn' onClick={showIndexList} ></img>
    </main>
  );
}
export default App;
