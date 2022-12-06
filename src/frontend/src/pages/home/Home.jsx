import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import characterImg from '../../assets/images/character.png';
import Modal from '../../components/AddValletModal/Modal'
import arrow from '../../assets/images/arrow.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {

  useEffect(()=>{
    let token = sessionStorage.getItem('token');
    console.log(token);
  }, [])

  const [ modalVisible, setModalVisible ] = useState(false);
  const handleModalVisible = () => {

    if (modalVisible === true) {

        setModalVisible(false);

    }
    else {

        setModalVisible(true);

    }

}

const RightSide = styled.div`
display: flex;
text-align: flex-end;
justify-content: flex-end;
align-items: center;
width: 100%;
`

const Main = styled.div`
width: 81vw;
height: 83vh;
padding: 3rem 0 0 4rem;
min-width: 20rem;
`

const Container = styled.div`
display: flex;
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

const Chevron = styled.div`
  
  display: inline-block;
  margin-right: 6rem;
  border-style: solid;
	border-width: 3px 3px 0 0;
	content: '';
  position: relative;
  margin-left: 1.5rem;
  min-height: 8px;
	transform: rotate(-225deg);
	min-width: 8px;
  cursor: pointer;
  text-decoration: none;

  `

const Div = styled.div`
display: flex;
justify-content: space-between;
`
const CharacterTitle = styled(PBold)`
text-align: right;
font-size: 1.4rem;

`
const CharacterDesc = styled(P)`
text-align: right;
margin-top: 0.6rem;
font-size: 1.4rem;
`

const Img = styled.img`
width: 6rem;
height: 6rem;
`

const Column = styled.div`
display: flex;
flex-direction: column;
`

const SummaryTitle = styled.p`
font-size: 2rem;
`

const Bold = styled(SummaryTitle)`
font-weight: 700;
font-size: 1.6rem;
margin-right: 0.5rem;
`
const Row = styled.div`
display: flex;
height: 4rem;
margin-top: 3rem;
align-items: center;
font-size: 1.5rem;
`

const QueueButton = styled.button`
display: flex;
align-items: center;
justify-content: space-evenly;
background-color: #F7F7F7;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border: none;
width: 1%;
height: 5em;
margin-top: 1rem;
text-align: left;
min-width: 22.8rem;
border-bottom: 0.3rem solid #70D44B;
font-weight: 600;
cursor: pointer;
`

const FilterDayButton = styled.button`
margin-left: 1rem;
font-size: 1.4rem;
background-color: #FFF;
border: none;
font-weight: 600;
display: flex;
align-items: center;
`

const BiggerP = styled.p`
font-size: 2.5rem;
font-weight: 700;
`

const SmallerP = styled.p`
font-size: 1.5rem;

`

const StatsDiv = styled.div`
height: 10rem;
display: flex;
background-color: #F7F7F7;
flex-direction: column;
justify-content: space-evenly;
width: 22.5rem;
border-radius: 9px;
margin-top: 1rem;
padding-top: 1rem;
padding-bottom: 1rem;
padding-left: 2rem;
padding-right: 1rem;
`
const AddButton = styled.button`
display: flex;
border: none;
background-color: #70D44B;  
width: 5rem;
justify-content: center;
align-items: center;
height: 10rem;
margin-top: 1rem;
border-radius: 8px;
margin-left: 1.3rem;
color: #fff;
font-size: 3rem;
font-weight: 400;
cursor: pointer;
`

const Br = styled.br`
`

const [ name, setName ] = useState('');
const handleName = (e) => {
  setName(e.target.value);
}

  return (
  <Container>
    <Column>
      <Main>
        <Column>
          <Column>
            <Row >
              <Bold>Acompanhar</Bold>
              em tempo real
            </Row>
            <Link style={{textDecoration:'none', width:'10px'}} to='queue'>
            <QueueButton><Img src={arrow} style={{width:'1.5rem'}}/>Fila de <Br /> ordem de serviços</QueueButton>
            </Link>
            <Row style={{marginTop:"2rem"}}>
              <Bold>Resumo</Bold> estatísticas gerais <FilterDayButton>Hoje <Chevron style={{marginLeft: '0.8rem'}}/></FilterDayButton>
            </Row>
            <Row>
              <StatsDiv>
                <BiggerP>203</BiggerP>
                <SmallerP>carros estacionados</SmallerP>
              </StatsDiv>
              <StatsDiv style={{marginLeft:"1.3rem"}}>
                <BiggerP>7m</BiggerP>
                <SmallerP>tempo para buscar veículo</SmallerP>
              </StatsDiv>
            </Row>
            <Row style={{marginTop: '5rem'}}>
              <Bold>Manobristas</Bold> e afins
            </Row>
            <Row style={{marginTop: "4rem"}}>
              <StatsDiv>
                <BiggerP>49</BiggerP>
                <SmallerP>manobristas</SmallerP>
              </StatsDiv>
              <AddButton onClick={handleModalVisible}>+</AddButton>

            </Row>
          </Column>
        </Column>
      </Main>
    </Column>
    {modalVisible === true && <Modal handleModalVisible={handleModalVisible} name={name} handleName={handleName}/>}
    </Container> 
  )

}

export default HomePage;