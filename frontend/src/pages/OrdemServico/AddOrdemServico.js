import React , {  useState } from 'react';

import api from '../../services/api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';




export default function AddOrdemServico(){

  const [maintenanceIdData, setmaintenanceIdData] = useState(0);
  const [serviceIdData, setserviceIdData] = useState(0);
  const [startDateData, setstartDateData] = useState(Date.now);
  const [finishDateData, setfinishDateData] = useState(Date.now);
  const [licenseData, setlicenseData] = useState('');

    const [openDialogError, setopenDialogError] = useState(false);
    const [errorMessageOperation, setErrorMessage] = useState('');

    const [openDialogSuccess, setopenDialogSuccess] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState('');



    const handleSubmit = (e) => {
      // e.preventDefault();
      var x = new Date(startDateData).toLocaleDateString()
      var y = new Date(startDateData).toLocaleDateString()
       console.log(x.split('/')[0]);
      // let beginData = new Date(startDateData).toLocaleDateString().split('/')
      // let endData = new Date(finishDateData).toLocaleDateString().split('/')
        (async () => {
          try {
              await api.post(`/ordem`,{
                maintenanceId: maintenanceIdData, serviceId: serviceIdData, startDate: `${x.split('/')[2]}-${x.split('/')[1]}-${x.split('/')[0]}`, finishDate: `${y.split('/')[2]}-${y.split('/')[1]}-${y.split('/')[0]}`,   license: licenseData 
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
        setopenDialogSuccess(false);
    };


    return(
        <div>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
            <TextField
                id="outlined-required"
                label="Placa Veículo"
                defaultValue=""
                onChange={(e) => setlicenseData(e.target.value)}
                value={licenseData}
              />
              <br /><br /><br />
              <TextField
                id="outlined-required"
                label="Codigo Manutenção"
                defaultValue=""
                value={maintenanceIdData}
                onChange={(e) => setmaintenanceIdData(e.target.value)}
              />
              <br /><br /><br />
              <TextField
                id="outlined-required"
                label="Codigo Serviço"
                defaultValue=""
                value={serviceIdData}
                onChange={(e) => setserviceIdData(e.target.value)}
                
              />
              <br /><br /><br />
              <div class = "col-md-6">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Data de início"
                      value={startDateData}
                      onChange={(newValue) => {
                        setstartDateData(newValue);
                      }}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <br /><br /><br />
            <div class = "col-md-6">
                  <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                      label="Data Término"
                      value={finishDateData}
                      onChange={(newValue) => {
                        setfinishDateData(newValue);
                      }}
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>


          </div>
          <br /><br /><br />


 
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