import React from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { useSelector } from 'react-redux'

import { Container, Menu, PageBody } from './AppStyled'

import { isLogged } from './components/Helpers/AuthHandler'

import HomeScreen from './pages/HomeScreen'
import Tela2Screen from './pages/Tela2Screen'
import NotFound from './pages/NotFound'
import Login from './pages/Login'

import MenuItem from './components/MenuItem'
import PrivateRoute from './components/PrivateRoute'

export default () => {
    const name = useSelector(state => state.user.name)
    let logged = isLogged()

    return (
        <BrowserRouter>
            <Container>
                <Menu>
                    <div className="logo">
                        <img src="/assets/menu/logo.png" alt="logo" width="120" height="40"></img>
                    </div>
                    
                    <div className="menuItem">
                        <MenuItem icon="/assets/menu/home.png" link="/" />
                        <MenuItem icon="/assets/menu/users.png" link="/users" />
                        <MenuItem icon="/assets/menu/item.png" link="/items" />
                        <MenuItem icon="/assets/menu/order.png" link="/orders" />
                        {!logged &&
                            <>
                                <MenuItem icon="/assets/menu/login.png" link="/login" />
                            </>  
                        }
                        {logged &&
                            <>
                                <MenuItem icon="/assets/menu/logout.png" link="/logout" />
                            </>
                        }
                    </div>
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
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/clients">
                            <div>Tela de Clientes</div>
                        </Route>
                        <Route path="/tela2/:nome">
                            <Tela2Screen />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </PageBody>
            </Container>
        </BrowserRouter>
    )
}