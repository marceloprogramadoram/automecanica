import React , {  useState } from 'react';

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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





const ListagemOrdemServico = () =>{
    const [ServiceOrderData, setServiceOrderData] = useState([]);

    const [id, setId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [maintenanceIdData, setmaintenanceIdData] = useState(0);
    const [serviceIdData, setserviceIdData] = useState(0);
    const [licenseData, setlicenseData] = useState('');

    const [startDateDataEdit, setstartDateDataEdit] = useState('');
    const [finishDateDataEdit, setfinishDateDataEdit] = useState('');


  
    const [openConfirm, setOpenConfirm] = useState(false);

    const [openDialogError, setopenDialogError] = useState(false);
    const [errorMessageOperation, setErrorMessage] = useState('');


    const [valueStatus, setValueStatus] = useState('');
    const [valueLicense, setvalueLicense] = useState('');

  
    const handleRadioChange = (event) => {
      setValueStatus(event.target.value);
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
    const columns = [
      { field: 'license', headerName: 'Placa', width :120 },
      { field: 'maintenanceId', headerName: 'Cód. Manutencao' , width :140},
      { field: 'serviceId', headerName: 'Cód. Serviço' , width :140 },
      { field: 'startDate', headerName: 'Data de Início' , width :140},
      { field: 'finishDate', headerName: 'Data de Término' , width :140},
      { field: 'estimetive', headerName: 'Estimativa' , width :140},

      { field: 'Editar', headerName: '', renderCell: (cellValues) => {
          return <button onClick={()=>HandleOpenModal(cellValues)} >Editar</button>;
        }
      },
      { field: 'Excluir', headerName: '', renderCell: (cellValues) => {
        return <button onClick={()=>HandleOpenModalDelete(cellValues)}  >Excluir</button>;
      }
    }
    ]
    const [statusOrder, setstatusOrder] = React.useState('');

    const handleChange = (event) => {
      setstatusOrder(event.target.value);
    };
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
      setmaintenanceIdData(data.row.Id)
      setOpenConfirm(true)
    };

    const HandleDelete = ()=> {
      (async () => {
        try {
        await api.delete(`/ordem/${id}`);
          setOpenConfirm(false);
          await loadData()
        } catch(e) {
          setErrorMessage("Não foi possível realizar a operação.")
          setopenDialogError(true);
        }
      
      })();
    };


    const HandleOpenModal = (
      data
    )=> {

      setId(data.id)
      setlicenseData(data.row.license)
      setmaintenanceIdData(data.row.maintenanceId)
      setserviceIdData(data.row.serviceId)
      setstartDateDataEdit(data.row.startDate)
      setfinishDateDataEdit(data.row.finishDate)
      setIsOpen(true)
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      (async () => {
        try {
          await api.put(`/ordem/${id}`,{
            maintenanceId: maintenanceIdData, serviceId: serviceIdData, startDate: `${startDateDataEdit}`.split('/')[2]+"-"+`${startDateDataEdit}`.split('/')[1]+"-"+`${startDateDataEdit}`.split('/')[0] , finishDate: `${finishDateDataEdit}`.split('/')[2]+"-"+`${finishDateDataEdit}`.split('/')[1]+"-"+`${finishDateDataEdit}`.split('/')[0], license:licenseData
          });

          setIsOpen(false);
          await loadData()

        } catch(e) {
          setErrorMessage("Não foi possível realizar a operação.")
          setopenDialogError(true);
        }
      
      })();
    }

    // useEffect( () => {
    //     (async () => {
    //       await loadData()
    //     })();
    // },[]);
    const styles = {
      myCoolButton: {
          paddingTop: "1vh",
          paddingBottom: "2vh",
          // paddingRight: "10vw",
          // paddingLeft: "10vw"
      }
  }
  // const handleloadDataPlaca = () => {
  //   loadDataPlaca()

  // };
    const loadDataPlaca = async() => {
      const { data } = await api.get(`/ordem/license/${licenseData}`);
      setServiceOrderData(data);
    }


    // const handleloadDataStatus = () => {
    //   loadData()

    // };
    const loadData = async() => {
      const { data } = await api.get(`/ordem/${valueStatus}`);
      setServiceOrderData(data);
    }

    return (
        <div style={{ height: 500 , width :1800}}>
            <FormControl sx={{ minWidth: 200 }}>
                {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
                <TextField
                    id="outlined-required"
                    label="Placa Veículo"
                    defaultValue=""
                    onChange={(e) => setlicenseData(e.target.value)}
                    value={licenseData}
              />
            </FormControl>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <Button variant="contained" color='primary' style={styles.myCoolButton}  onClick={()=>loadDataPlaca() }> Pesquisar Placa</Button>
              <form >
                  <FormControl sx={{ m: 3 }} variant="standard">
                    <FormLabel id="demo-error-radios">Pesquisa por Status</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="quiz"
                      value={valueStatus}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel value={0} control={<Radio />} label="não iniciado" />
                      <FormControlLabel value={1} control={<Radio />} label="em andamento" />
                      <FormControlLabel value={2} control={<Radio />} label="concluído" />
                    </RadioGroup>
                    <Button sx={{ mt: 1, mr: 1 }} onClick={()=>loadData() } variant="outlined">
                      Pesquisar Status
                    </Button>
 
                  </FormControl>
            </form>

            <DataGrid
            rows={ServiceOrderData}
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
              <TextField
                id="outlined-required"
                label="Data Início"
                defaultValue=""
                value={startDateDataEdit}
                onChange={(e) => setstartDateDataEdit(e.target.value)}
                
              />
            <br /><br /><br />
              <TextField
                id="outlined-required"
                label="Data Término"
                defaultValue=""
                value={finishDateDataEdit}
                onChange={(e) => setfinishDateDataEdit(e.target.value)}
                
              />
                {/* <input maintenanceIdData="nome" value={maintenanceIdData} onChange={(e) => setmaintenanceIdData(e.target.value)} /> */}
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
                {"Deseja excluir o registro de serviço?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {/* Deseja excluir o registro de Ordem de Serviço? */}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Não</Button>
                <Button onClick={HandleDelete} autoFocus>
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

export default ListagemOrdemServico;