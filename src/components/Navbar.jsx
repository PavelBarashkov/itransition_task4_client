import React, { useContext } from "react";
import { Context } from "../index";
import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import { observer } from "mobx-react-lite";

export const NavBar = observer( () => {
    const {user} = useContext(Context);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">Task#4</Navbar.Brand>
            {user.isAuth
                ?
                <Nav className="ms-auto">
                    <Button 
                        variant="outline-light"
                        onClick={()=> logOut()}
                    >
                        Выйти
                    </Button>
                </Nav>

                :
                <Nav className="ms-auto">
                    <Button variant="outline-light">Авторизация</Button>
                </Nav>
            }
            </Container>
        </Navbar>
    )
})