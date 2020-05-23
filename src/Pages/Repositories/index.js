import React, { useEffect, useState } from 'react';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Repositories() {
  const history = useHistory();
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    let repositoryData = localStorage.getItem('repositoryData');
    
    if(repositoryData !== null) {
      repositoryData = JSON.parse(repositoryData);
      setRepositories(repositoryData);
      localStorage.clear();
    } else {
      history.push('/');
    }
  }, []);  // deixando o campo [] vazio ele vai ser disparado quando a página iniciar.
  
  return (
    <S.Container>
      <S.Title>Repositórios</S.Title>
      <S.List>
        { repositories.map(repository => {
          return (
            //<S.ListItem key={repository.name}>Repositório: {repository.name}</S.ListItem>
            <S.ListItem key={repository.name}><S.LinkItem href={repository.html_url} target="_blank">Repositório: {repository.name}</S.LinkItem></S.ListItem>
          )
        }) }
      </S.List>
      <S.LinkHome to="/">Voltar</S.LinkHome>
    </S.Container>
  )
}

export default Repositories;