import React, { useState } from 'react';
import styled from 'styled-components';
import eye from '../../assets/images/queue-eye.svg';
import './Queue.css';

const Container = styled.div`
display: flex;
flex-direction: column;
padding: 6rem 5rem 0 5rem;
`

const Title = styled.p`
font-size: 2rem;
font-weight: 700;
`

const Subtitle = styled(Title)`
font-weight: 400;
`

const Main = styled.main`
margin-top: 2rem;
display: flex;
`

const Column = styled.div`
flex: 1;
display: flex;
flex-direction: column;
margin-right: 2rem;
`

const Row = styled.div`
display: flex;
justify-content: space-between;
`

const ColumnName = styled.p`
font-size: 1.3rem;
`

const Input = styled.input`
height: 3.5rem;
background-color: #EEEEEE;
outline: none;
border: none;
padding-left: 1rem;
border-radius: 10px;
margin-top: 1rem;
`

const Button = styled.button`
background-color: #70D44B;
color: #fff;
height: 4rem;
border: none;
outline: none;
font-weight: 600;
border-radius: 10px;
margin-top: 1.5rem;
`

const LicensePlate = styled.div`
height: 8rem;
background-color: #24272A;
color: #fff;
border-radius: 10px;
display: flex;
justify-content: space-around;
align-items: center;
margin-top: 1.5rem;
`

const DoneLicensePlate = styled(LicensePlate)`
background-color: #70D44B;
`

const P = styled.p`
font-size: 2.5rem;
`

const RightSide = styled.div`
display: flex;
width: 10%;
justify-content: flex-end;
`

const Img = styled.img`
width: 3rem;
`

function Queue() {  

    const LicensePlateConstructor = (props) => {

        return (

            <LicensePlate className='car-plate'>
                <Row>
                  <Column stlye={{marginRight:'0'}}>
                      <P>{props.plate}</P>
                      <P style={{fontSize:'1.2rem'}}>
                      há {props.time} minutos
                      </P>
                  </Column>
                  <RightSide>
                      <Img src={eye}/>
                  </RightSide>
                </Row>
            </LicensePlate>

        )

    }

    const DoneLicensePlateConstructor = (props) => (

      <DoneLicensePlate className='car-plate'>
        <Row>
          <Column stlye={{marginRight:'0'}}>
            <P>{props.plate}</P>
            <P style={{fontSize:'1.2rem'}}>
              há {props.time} minutos
            </P>
          </Column>
          <RightSide>
            <Img src={eye}/>
          </RightSide>
        </Row>
      </DoneLicensePlate>

    )

    const [ plate, setPlate ] = useState('');
    const handlePlate = (e) => {
      setPlate(e.target.value); 
    }

  return (
  <Container>
    <Title>Fila</Title>
    <Subtitle>Ordens de Serviço</Subtitle>
    <Main>
      <Column>
        <ColumnName>Placa do veículo</ColumnName>
        <Input placeholder='AAA-2A22' onChange={handlePlate}/>
        <Button onClick={()=>{console.log(plate)}}>Buscar</Button>
      </Column>
      <Column>
        <ColumnName>Aguardando estacionar</ColumnName>
          <LicensePlateConstructor plate='KJP-0215' time='2'/>
          <LicensePlateConstructor plate='AAA-2B22' time='2'/>
          <LicensePlateConstructor plate='AAA-2B22' time='2'/>
      </Column>
        <Column>
          <ColumnName>Estacionado</ColumnName>
          <LicensePlateConstructor plate='AAA-2C22' time='2'/>
          <LicensePlateConstructor plate='AAA-2D22' time='2'/>
          <LicensePlateConstructor plate='AAA-2E22' time='2'/>
          <LicensePlateConstructor plate='AAA-2F22' time='2'/>
          <LicensePlateConstructor plate='AAA-2G22' time='2'/>
        </Column>
        <Column>
          <ColumnName>Aguardando retirada</ColumnName>
            <LicensePlateConstructor plate='AAA-2H22' time='2'/>
        </Column>
        <Column>
          <ColumnName>Finalizados nos últimos 10min</ColumnName>
            <DoneLicensePlateConstructor plate='KJP-0215' time='4'/>
            <DoneLicensePlateConstructor plate='KJP-0215' time='5'/>
            <DoneLicensePlateConstructor plate='KJP-0215'time='9'/>
        </Column>
    </Main>
  </Container>
  )
}

export default Queue;
