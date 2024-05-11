import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BlueTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textAlign: 'center',
}));

const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
}));

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  marginRight: '8px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down('sm')} .${theme.breakpoints.down('md')} .${theme.breakpoints.down('lg')} .${theme.breakpoints.down('xl')}`]: {
    fontSize: '0.8rem',
  },
  textAlign: 'center',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserTable = ({ userList, page, rowsPerPage, onUpdateUserList}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [filterName, setFilterName] = useState('');

  const handleClose = () => {
    handleUserUpdateApi(userId);
    setDialogOpen(false);
  };

  const handleUpdate = () => {
    handleUserUpdateApi()
    setDialogOpen(false);
  };

  const handleUserUpdateApi = async () => {
    try {
      const formData = new FormData();
      formData.append('Username', user.username);
      formData.append('Email', user.email);
      formData.append('Password', user.password);

      const response = await fetch(`https://localhost:7076/api/v1/User/${userId}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      console.log("Usuário atualizado com sucesso!");

    } catch (error) {
      console.error("Erro durante a requisição:", error.message);
    }
  };

  const handleUserApi = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7076/api/v1/User/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.data);

    } catch (error) {
      console.error("Erro durante a requisição:", error.message);
    }
  };

  const handleEditUser = (userId) => {
    setDialogOpen(true);
    setUserId(userId);
    handleUserApi(userId);
  };

  const handleDeleteUserApi = async (UserId) => {
    try {
      const response = await fetch(`https://localhost:7076/api/v1/User/${UserId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const updatedUserList = userList.filter(user => user.id !== UserId);
      onUpdateUserList(updatedUserList); 

    } catch (error) {
      console.error("Erro durante a requisição:", error.message);
    }
  }; 

  const filteredUserList = userList.filter(user => user.username.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <div>
   <TextField
        label="Filtrar por nome"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        color="primary"
        InputLabelProps={{
          style: { color: 'white' } // define a cor do rótulo para branco
        }}
        InputProps={{
          style: { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)', width: '100%' ,marginRight: '580px' } // define a cor do texto e o fundo para branco
        }}     
      />
      <TableContainer component={Paper} sx={{ width: '100%', margin: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <BlueTableCell>Email</BlueTableCell>
              <BlueTableCell align="center">Nome de Usuário</BlueTableCell>
              <BlueTableCell align="center">Senha</BlueTableCell>
              <BlueTableCell align="center">Ações</BlueTableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                ? filteredUserList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredUserList
              ).map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.email}
                </StyledTableCell>
                <StyledTableCell align="center">{user.username}</StyledTableCell>
                <StyledTableCell align="center">{user.password}</StyledTableCell>
                <StyledTableCell align="center">
                  <GreenButton variant="contained" onClick={() => handleEditUser(user.id)}>Editar</GreenButton>
                  <RedButton variant="contained" onClick={() => handleDeleteUserApi(user.id)}>Excluir</RedButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Detalhes do Usuário
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {user && (
            <div>
              <TextField
                label="Email"
                value={user.email}
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
             <TextField
            label="Username"
            value={user.username}
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            <TextField
            label="Password"
            value={user.password}
            fullWidth
            variant="outlined"
            margin="normal"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdate}>
            Atualizar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
    </div>
  );
};

export default UserTable;
