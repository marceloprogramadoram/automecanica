import React , { useEffect, useState } from 'react';

import api from '../../services/api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddManutencao(){

    const [name, setName] = useState('');

    const [openDialogError, setopenDialogError] = useState(false);
    const [errorMessageOperation, setErrorMessage] = useState('');

    const [openDialogSuccess, setopenDialogSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');

    const handleSubmit = (e) => {
        (async () => {
          try {
              await api.post(`/manutencao`,{
              nome: name
            });
            setMessageSuccess("Operação realizada com sucesso.");
            setopenDialogSuccess(true)
            
          } catch(e) {
            setErrorMessage("Não foi possível realizar a operação.")
            setopenDialogError(true);
          }
        
        })();
      }

    const handleCloseDialogError = () => {
        setopenDialogError(false);
      };

    const handleCloseDialogSucess = () => {
        //  api.get(`/manutencao`);
        setopenDialogSuccess(false);
    };
    return(
        <div>
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
                    {/* <Button variant="contained" color='secondary' onClick={()=>setIsOpen(false) }>Cancelar</Button> */}
                </div>
                {/* <Button variant="contained">Salvar</Button>
                <Button variant="contained" color='secondary'>Cancelar</Button> */}
            </form>


            <Dialog
            open={openDialogSuccess}
            onClose={handleCloseDialogSucess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">
                {messageSuccess}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {/* {errorMessageOperation} */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialogSucess} autoFocus>
                  Ok
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