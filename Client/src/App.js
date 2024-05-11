import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import UserTable from './Componet/UserTable';
import Card from './Componet/Card';
import TablePagination from '@mui/material/TablePagination';

function App() {
  const [userData, setUserData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newRowsPerPage, setNewRowsPerPage] = useState(5);
  const handleUpdateUserList = (updatedUserList) => {
    setUserList(updatedUserList);
  };

  useEffect(() => {
    handleGetUserApi(page + 1,rowsPerPage);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleGetUserApi(newPage + 1, rowsPerPage); // Adiciona 1 porque as páginas começam do 1
  };
  
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (newRowsPerPage !== rowsPerPage) { // Verifica se o novo valor é diferente do valor atual
      setPage(0);
      setRowsPerPage(newRowsPerPage);
      const currentPage = Math.ceil((page + 1) / newRowsPerPage);
      const startIndex = (currentPage - 1) * newRowsPerPage;
      const endIndex = startIndex + newRowsPerPage;
      const isPageLoaded = userList.slice(startIndex, endIndex).length === newRowsPerPage;
      if (!isPageLoaded) {
        handleGetUserApi(currentPage, newRowsPerPage);
      }
    }
  }; 
  
  const handleGetUserApi = async (pageNumber, pageSize) => {
    try {
      const response = await fetch(`https://localhost:7076/api/v1/User/pagination?PageNumber=${pageNumber}&PageSize=${pageSize}`);
  
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      const data = await response.json();
      
      setUserList(data.data);
    } catch (error) {
      alert(error);
    }
  };

  const gerarUsuario = () => {
    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        const user = data.results[0];
        setUserData({
          email: user.email,
          username: user.login.username,
          password: user.login.password
        });
      })
      .catch(error => console.error("Erro ao buscar usuário:", error));
  };

  const salvarUsuario = async () => {
    try {
      if (!userData) {
        throw new Error("Nenhum usuário gerado para salvar");
      }

      const formData = new FormData();
      formData.append('Username', userData.username);
      formData.append('Email', userData.email);
      formData.append('Password', userData.password);

      const response = await fetch('https://localhost:7076/api/v1/User', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const responseBody = await response.text();
        throw new Error(responseBody);
      }

      console.log("Usuário salvo com sucesso!");
      gerarUsuario();
      handleGetUserApi(1, rowsPerPage); 

    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  return (
    <div className="App">
        <header className="App-header">
        {!userData && (
          <img src={logo} className="App-logo" alt="logo" />  
        )}      
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {!userData && (
          <Button  variant="contained" sx={{ marginRight: 1 }} onClick={gerarUsuario}>
            Gerar Usuário
          </Button>
        )}
          {userData && (
        <div  style={{ marginTop: '10px' }}>
           <Card
          title="Gerador de usuarios"
          word= {userData.username}
          definition={userData.email}
          example= {userData.password}
        />
          <div style={{ marginTop: '10px' }}> 
            <Button variant="contained" onClick={salvarUsuario}>
              Salvar Usuário
            </Button>
          </div>
          <div style={{ marginTop: '10px' }}> 
            <Button variant="contained" onClick={gerarUsuario}>
              Gerar Outro Usuário
            </Button>
          </div>
        </div>
      )}
        </Box>
        <UserTable userList={userList} page={page} rowsPerPage={rowsPerPage} onUpdateUserList={handleUpdateUserList}/>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: 'white' }}
      />
      </header>
    </div>
  );
}

export default App;