import React, { useState } from 'react';
import styled from 'styled-components';
import eye from '../../assets/images/queue-eye.svg';
import './Queue.css';

const Container = styled.div`
display: flex;
flex-direction: column;
padding: 6rem 6rem 0 6rem;
`

const P = styled.p`
font-size: 2.4rem;
font-weight: 400;
`

const PBold = styled(P)`
margin-top: 1rem;
font-size: 3rem;
font-weight: 700;
`

const Row = styled.div`
display: flex;
`

const Column = styled.div`
display: flex;
flex-direction: Column;
font-size: 13px;
`

const Main = styled.main`
display: flex;
justify-content: space-between;
padding-top: 3rem;
`

const Plates = styled.div`
display: grid;
margin-top: 2rem;
grid-template-columns: 1fr 1fr;
grid-gap: .5rem;
`

const Time = styled.p`
font-size: 10px;
width: 100%;
text-align: left;
`

function CustomerQueue() {  

  const PlateConstructor = (props) => {

    const Plate = styled.button`
    font-size: 20px;
    border-radius: 10px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: #24272A;
    color: #fff;
    height: 7rem;
    width: 13rem;
    padding: 1.5rem;
    `

    return (
      
      props.done ?
      <Plate onClick={()=>{console.log('a')}} style={{backgroundColor:'#70D44B'}}>
        {props.plate}
        <Time>há {props.time} minutos</Time>
      </Plate>
      :
      <Plate onClick={()=>{console.log('a')}}>
        {props.plate}
        <Time>há {props.time} minutos</Time>
      </Plate>

    )
  } 

  return (
    <>
      <Container>
        <Column>
          <P>Estapar</P>
          <PBold>Painel do cliente</PBold>
        </Column>
        <Main>
          <Column>
            Ordem de serviço de retirada emitida
            <Plates>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
            </Plates>
          </Column>
          <Column>
            Manobrista atribuído
            <Plates>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
              <PlateConstructor plate="AAA-2A22" time="2"/>
            </Plates>
          </Column>
          <Column>
            Últimos dez entregues
            <Plates>
              <PlateConstructor plate="AAA-2A22" time="2" done="true"/>
              <PlateConstructor plate="AAA-2A22" time="2" done="true"/>
              <PlateConstructor plate="AAA-2A22" time="2" done="true"/>
              <PlateConstructor plate="AAA-2A22" time="2" done="true"/>
            </Plates>
          </Column>
        </Main>
      </Container>
    </>
  )
}

export default CustomerQueue;
