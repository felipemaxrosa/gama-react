import React, { useState } from 'react';
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';

function App(props) {
  const history = useHistory();
  const [ usuario, setUsuario] = useState('');
  const [ erro, setErro ] = useState(false);

  async function handlePesquisa() {
    await axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => {
        let repositories = response.data;
        //console.log(repositories);

        let repositoryData = [];

        repositoryData = repositories.map((repository) => {
          const { id, name, html_url } = repository;
          return {
            id,
            name,
            html_url
          }
        });
        
        localStorage.setItem('repositoryData', JSON.stringify(repositoryData));
        setErro(false);
        history.push('/repositories');
      })
      .catch(err => {
        console.log(err);
        setErro(true);
      });
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input className="usuarioInput" value={usuario} placeholder="Usuário" onChange={(e) => setUsuario(e.target.value)}/>
        <S.Button onClick={handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' }
    </S.HomeContainer>
  );
}

export default App;
