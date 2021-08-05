import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { useSelector } from 'react-redux'

import { Container, Menu, PageBody } from './AppStyled'

import HomeScreen from './pages/HomeScreen'
import Tela2Screen from './pages/Tela2Screen'
import MenuItem from './components/MenuItem'
import PrivateRoute from './components/PrivateRoute'

export default () => {
    const name = useSelector(state => state.user.name)

    return (
        <BrowserRouter>
            <Container>
                <Menu>
                    <MenuItem icon="/assets/store.png" link="/" />
                    <MenuItem icon="/assets/users.png" link="/users" />
                    <MenuItem icon="/assets/order.png" link="/orders" />
                    <MenuItem icon="/assets/clients.png" link="/clients" />
                </Menu>
                <PageBody>
                    <Switch>
                        <Route exact path="/">
                            <HomeScreen />
                        </Route>
                        <PrivateRoute path="/users">
                            <div>Tela de Usuários</div>
                        </PrivateRoute>
                        <Route path="/orders">
                            <div>Tela de Pedidos</div>
                        </Route>
                        <Route path="/clients">
                            <div>Tela de Clientes</div>
                        </Route>
                        <Route path="/tela2/:nome">
                            <Tela2Screen />
                        </Route>
                    </Switch>
                </PageBody>
            </Container>
        </BrowserRouter>
    )
}