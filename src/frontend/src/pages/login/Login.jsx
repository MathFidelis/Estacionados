import React, { useState, useNavigate } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/estapar-logo.svg';
import password from '../../assets/images/password.svg';
import person from '../../assets/images/person.svg';
import '../../components/Global.css';  
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';
import { useEffect } from 'react';

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const LoginDiv = styled.div`
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

function Login() {

    const postLogin = () => {

        const requestSettings = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:userEmail,
                password: userPassword})
        }

        const request = async () => {
            const response = await fetch('http://api.estapar.code.br.com:1337/api/v1/user/auth', requestSettings)
            const json = await response.json();
            console.log(json);
            if (json.status == 200) {
                sessionStorage.setItem('user_id', json.success.data.id);
                sessionStorage.setItem('token', json.success.data.token);
                document.location = '/app';
            }
            else {
                errorLoginToast();
            }
        }

        request();

    }

    // Hooks
    const [ userEmail, setUserEmail ] = useState('');
    function handleEmail(e) {
        setUserEmail(e.target.value);
    }
    const [ userPassword, setUserPassword ] = useState('');
        function handlePassword(e) {
            setUserPassword(e.target.value);
    }
    // Toast para erro de login
    const errorLoginToast = () => {
        toast.error('Email ou senha incorretos', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: 'toast'
        });
    }

    return (
        <Container>
            <LoginDiv>
                <Img src={logo} style={{width:'8rem'}} />
                <Inputs>
                    <Input type="email" placeholder='E-mail' id="email" onChange={handleEmail} value={userEmail}/>
                    <Input type="password" placeholder='Senha' id="password" onChange={handlePassword} value={userPassword}/>
                </Inputs>
                <AcceptButton onClick={postLogin}>Entrar</AcceptButton>
            </LoginDiv>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        <ToastContainer />
        </Container>
    )

}

export default Login;