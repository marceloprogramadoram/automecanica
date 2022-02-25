import React from "react";
import {  Route, Switch } from "react-router-dom";

import Manutencao from "../pages/Manutencao/Manutencao";
import OrdemServico from "../pages/OrdemServico/OrdemServico";
import Servico from "../pages/Servico/Servico";

const Rotas = () => {
   return(
       <Switch>
           <Route path="/manutencao" component = { Manutencao } exact></Route>
           <Route component = { Servico }  path="/servico" />
           <Route component = { OrdemServico }  path="/ordem" />
       </Switch>

   )
}

export default Rotas;