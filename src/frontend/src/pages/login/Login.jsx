import React, { useState, useNavigate } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/estapar-logo.svg';
import password from '../../assets/images/password.svg';
import person from '../../assets/images/person.svg';
import '../../components/Global.css';
import './Login.css';

function Login() {

    const postLogin = () => {
        const requestSettings = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: "contato@eliasbiondo.com", password: "12345678"})
        }

        fetch('http://api.estapar.code.br.com:1337/api/v1/user/auth', requestSettings)
            .then(response => response.json())
            .then(data => sessionStorage.setItem('bearer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM1ZTBhODZmLWUzY2EtNDFkMS04Mzc2LTdlZDRhYWIyZDc4OSIsImVtYWlsIjoiY29udGF0b0BlbGlhc2Jpb25kby5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njk5ODMyNTUsImV4cCI6MTY3MDA2OTY1NX0.fKMF6n6jox5x_Hjx6-hbBh7FiDq0xwU3M2hvTPGjPZA'));
            let token = sessionStorage.getItem('bearer');
            console.log(token);
            document.location = '/app';
        }

    const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `

    const Login = styled.div`
    background-color: #fff;
    width: 40%;
    border-radius: 16px;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    `

    const Img = styled.img`
    `

    const Inputs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 30%;
    justify-content: space-evenly;
    align-items: center;
    `

    const Input = styled.input`
    background-color: #EEEEEE;
    padding: 1rem;
    border: none;
    border-radius: 10px;
    width: 70%;
    padding-left: 1rem;
        `

    const AcceptButton = styled.button`
    background-color: #70D44B;
    margin-top: -2rem;
    border: none;
    border-radius: 10px;
    padding: 1rem 3.5rem 1rem 3.5rem;
    color: #fff;
    font-weight: 600;
    `

    const [ senha, setSenha ] = useState('s');
    function handlePassword(e) {
        setSenha(e.target.value);
    }

    return (
        <Container>
            <Login>
                <Img src={logo} style={{width:'8rem'}} />
                <Inputs>
                    <Input type="email" placeholder='E-mail' id="email"/>
                    <Input type="password" placeholder='Senha' id="password"/>
                </Inputs>
                <AcceptButton onClick={postLogin}>Entrar</AcceptButton>
            </Login>
        </Container>
    )

}

export default Login;