import React, { useContext, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { login, registration } from "../http/userAPI.js";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts"
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";

export const Auth = observer(() => {
    const {user} = useContext(Context) 
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                
            } else {
                data = await registration(name, email, password);
            }
            await user.setUser(user)
            await user.setIsAuth(true)
            navigate("/table")
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 400}} className='p-5'>
                <h2 className="m-auto ">{isLogin ? 'Авторизация' : 'Регистрация'} </h2>
                {isLogin
                        ?
                    <Form className="d-flex flex-column">
                  
                        <Form.Control
                            className="mt-3"
                            placeholder="Ведите ваш email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Ведите ваш пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className="d-flex justify-content-between align-items-center mt-3 p-2">
                                
                            <Button 
                                onClick={click}
                                className="mb-2"
                                variant="outline-secondary"
                            >
                                Войти
                            </Button>
                            <div>
                                Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
                            </div>
                        </Row>
                    
                    </Form>
                        :
                    <Form className="d-flex flex-column">
                  
                        <Form.Control
                            className="mt-3"
                            placeholder="Ведите ваше Имя"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Ведите ваш email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Ведите ваш пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Row className="d-flex justify-content-between align-items-center mt-3 p-2">
                            <Button 
                                onClick={click}
                                className="mb-2"
                                variant="outline-secondary"
                            >
                                Регистрация
                            </Button>
                            <div>
                                Есть аккаунт? <Link to={LOGIN_ROUTE}>Войти</Link>
                            </div>
                        </Row>
                    </Form>
                }
                
            </Card>

        </Container>
    )
})