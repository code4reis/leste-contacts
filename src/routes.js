import React from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom";

import HomePage from "./pages/HomePage/home";
import ListaContatos from "./pages/ListaContatos/listaContacts";

const Routes = () => (
        <BrowserRouter>
        <Switch>
            <Route exact path ="/" component = {HomePage} />
            <Route exact path = "/contatos" component = {ListaContatos} />
        </Switch>
        </BrowserRouter>
);

export default Routes;