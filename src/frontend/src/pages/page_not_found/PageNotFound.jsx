import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../components/Global.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import warning from '../../assets/images/warning.png';

const Container = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
padding: 6rem 6rem 0 6rem;
`

const Title = styled.p`
display: inline-flex;
align-items: center;
font-size: 2.5rem;
font-weight: 700;
padding-right: 0.3rem;
`

const Subtitle = styled.p`
font-size: 1.4rem;
margin-top: 2rem;
font-weight: 400;
padding-right: 0.3rem;
`

const Home = styled.a`
padding: 1rem;
background-color: #70D44B;
width: 7rem;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
text-decoration: none;
font-weight: 600;
border-radius: 10px;
font-size: 1.2rem;
margin-top: 4rem;
`

const Img = styled.img`
width: 4rem;
margin-right:1rem;
`

const TimeValue = styled.span`
font-size: 1.6rem;
padding-top: 1rem;
font-weight: 500;
`

function PageNotFound() {

    const renderer = ({ hours, minutes, seconds }) => {
          return <TimeValue>0{hours}:0{minutes}:0{seconds}</TimeValue>;
    };
    
    const redirect = () => {
        window.location.href='/';
    }

    return (
        <Container>
            <Title><Img src={warning} />Página não encontrada</Title>
            <Subtitle>Parece que a URL acessada não coincide com uma página existente.</Subtitle>
            <Countdown
                date={Date.now() + 5000}
                renderer={renderer}
                onComplete={redirect}
            />
        </Container>

    )

}

export default PageNotFound;