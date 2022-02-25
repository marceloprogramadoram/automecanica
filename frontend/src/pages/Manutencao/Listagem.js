import React , { useEffect, useState } from 'react';

import api from '../../services/api';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Modal from '@material-ui/core/Modal';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const Listagem = () =>{
    const [ManutencaoData, setManutencaoData] = useState([]);

    const [id, setId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

  
    const [openConfirm, setOpenConfirm] = useState(false);

    const [openDialogError, setopenDialogError] = useState(false);
    const [errorMessageOperation, setErrorMessage] = useState('');

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    const columns = [
      { field: 'id', headerName: 'ID' },
      { field: 'Nome', headerName: 'Descrição' , width :550 },
      { field: 'Editar', headerName: '', renderCell: (cellValues) => {
          return <button onClick={()=>HandleOpenModal(cellValues)} >Editar</button>;
        }
      },
      { field: 'Excluir', headerName: '', renderCell: (cellValues) => {
        return <button onClick={()=>HandleOpenModalDelete(cellValues)}  >Excluir</button>;
      }
    }
    ]

    // const handleClickOpen = () => {
    //   setOpenConfirm(true);
    // };
  
    const handleClose = () => {
      setOpenConfirm(false);
    };

    const handleCloseDialogError = () => {
      setopenDialogError(false);
      setOpenConfirm(false);

    };


    const HandleOpenModalDelete = (
      data
    )=> {
      setId(data.id)
      setName(data.row.Nome)
      setOpenConfirm(true)
    };

    const HandleDelete = ()=> {
      // console.log(`${id}`)
      (async () => {
        try {
        await api.delete(`/manutencao/${id}`);
          setOpenConfirm(false);
          await loadData()
        } catch(e) {
          setErrorMessage("Não foi possível realizar a operação.")
          setopenDialogError(true);
          // console.log(e)
        }
      
      })();
      // setIsOpen(true)
    };


    const HandleOpenModal = (
      data
    )=> {
      setId(data.id)
      setName(data.row.Nome)
      setIsOpen(true)
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      (async () => {
        try {
          await api.put(`/manutencao/${id}`,{
            nome: name
          });

          setIsOpen(false);
          await loadData()

        } catch(e) {
          setErrorMessage("Não foi possível realizar a operação.")
          setopenDialogError(true);
        }
      
      })();
    }

    useEffect( () => {


        // fetch("http://127.0.0.1:5000/manutencao"
        // , {
        //     'method' : 'GET',
        //     'headers': {'Content-Type': 'application/json'}
        //   })
        //     .then(resp => resp.json())
        //     .then(resp => setManutencaoData(resp))
        //     .catch(error => console.log(error))
        (async () => {
          await loadData()
        })();
    },[]);

    const loadData = async() => {
      const { data } = await api.get('/manutencao');
      setManutencaoData(data);
    }

    return (
        <div style={{ height: 500 , width :900}}>
            <DataGrid
            rows={ManutencaoData}
            columns={columns}
            pageSize={12}
            />

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
            Alteração de Cadastro
          </Typography>
          <br/>
          <form onSubmit={handleSubmit}>
            <div class= 'row'>

              <TextField
                id="filled-helperText"
                label="Descrição"
                defaultValue="Default Value"
                // helperText="Some important text"
                variant="filled"
                value={name}
                fullWidth="true"
                onChange={(e) => setName(e.target.value)} 
              />
                {/* <input name="nome" value={name} onChange={(e) => setName(e.target.value)} /> */}
            </div>
            <br></br>
            <div class='row'>
                <Button type='submit' variant="contained">Salvar</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" color='secondary' onClick={()=>setIsOpen(false) }>Cancelar</Button>
            </div>
            {/* <Button variant="contained">Salvar</Button>
            <Button variant="contained" color='secondary'>Cancelar</Button> */}
        </form>
        
        
        </Box>
      </Modal>


          <Dialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                {"Deseja excluir o registro de manuteção?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {/* Deseja excluir o registro de manuteção? */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Não</Button>
                <Button onClick={HandleDelete } autoFocus>
                  Sim
                </Button>
              </DialogActions>
          </Dialog>


          <Dialog
            open={openDialogError}
            onClose={handleCloseDialogError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                {errorMessageOperation}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {/* {errorMessageOperation} */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogError} autoFocus>
                  Ok
                </Button>
              </DialogActions>
          </Dialog>
      </div>

    );
    
}

export default Listagem;