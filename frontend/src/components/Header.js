import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: 15000
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
                <Link to="/">Home</Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
                <Link to="/manutencao">Manutenção</Link> 
          </Typography>
          <Typography variant="h6" className={classes.title}>
                <Link to="/servico">Serviço</Link> 
          </Typography>
          <Typography variant="h6" className={classes.title}>
                <Link to="/ordem">Ordem de Serviço</Link>
          </Typography>
        </Toolbar>
      </AppBar>
     
    </div>
  );
}