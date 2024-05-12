import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import UserTable from './Componet/UserTable';
import Card from './Componet/Card';
import TablePagination from '@mui/material/TablePagination';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import ButtonAppBar from './Componet/ButtonAppBar';

function App() {
  const [userData, setUserData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const handleUpdateUserList = (updatedUserList) => {
    setUserList(updatedUserList);
  };
  
  useEffect(() => {
    handleGetUserApi(page + 1, rowsPerPage);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handleGetUserApi(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (newRowsPerPage !== rowsPerPage) {
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
    setRefreshing(true);

    fetch("https://randomuser.me/api/")
      .then(response => response.json())
      .then(data => {
        const user = data.results[0];
        setUserData({
          email: user.email,
          username: user.login.username,
          password: user.login.password
        });

        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      })
      .catch(error => {
        console.error("Erro ao buscar usuário:", error);
        setRefreshing(false);
      });
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
      <ButtonAppBar userName={userData ? userData.username : ''} />
      <header className="App-header">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', marginLeft: '300px' }}>
              <UserTable userList={userList} page={page} rowsPerPage={rowsPerPage} onUpdateUserList={handleUpdateUserList} />
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
            </div>
            <div style={{ width: '50%', marginLeft: '50px', marginTop: '20px' }}>
              <div style={{ marginBottom: '1x', textAlign: 'center', marginRight: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    sx={{ marginRight: '5px' }}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={salvarUsuario}
                    title="Salvar Usuário" 
                  >
                  </Button>
                  <Button
                    sx={{ marginRight: '200px' }}
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={gerarUsuario}
                    title="Gerar Usuário" 
                  >
                  </Button>
                </div>
                <div style={{ marginBottom: '1x', textAlign: 'center', marginTop: '25px' }}>
                  <Card
                    word={userData?.username ?? ''}
                    definition={userData?.email ?? ''}
                    example={userData?.password ?? ''}
                  />
                  <img
                    src={logo}
                    style={{
                      width: '80%',
                      marginLeft: '10px',
                      marginTop: '-80px',
                      animationDuration: refreshing ? '1s' : '10s'
                    }}
                    className="App-logo"
                    alt="logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </header>
    </div>
  );
}

export default App;
