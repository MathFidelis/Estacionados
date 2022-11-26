import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import character from '../../assets/images/character.png';
import eye from '../../assets/images/eye.svg';
import search from '../../assets/images/search.svg';
import Modal from '../../components/AddModal/Modal';

const Container = styled.div`
display: flex;
`

const Column = styled.div`
display: flex;
flex-direction: column;
`

const SearchInput = styled.input`
flex: 1;
height: 4rem;
margin-left: 4rem;
background-color: #f7f7f7;
border: none;
border-radius: 0.8rem;
padding-left: 1rem;
`

const Row = styled.div`
display:flex;
`

const SearchButton = styled.button`
background-color: #ADADAD;
cursor: pointer;
border: none;
width: 3.8rem;
border-radius: 0.8rem;
display: flex;
align-items: center;
margin-left: 1rem;
justify-content: center;
`
const Img = styled.img`
width: 1.4rem;
`

const AddButton = styled.button`
cursor: pointer;
display: flex;
text-align: center;
align-items: center;
justify-content: center;
border: none;
font-size: 1.3rem;
width: 15rem;
background-color: #70D44B;
height: 4rem;
color: #fff;
border-radius: 0.8rem;
margin-left: 1rem;
`

const Table = styled.table`
border: none;
width: calc(80vw - 80px);
margin: 0px 4rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Tr = styled.tr`
padding-top: 2rem;
// padding-left: 4rem;
font-size: 1.2rem;
display: flex;
width: 100%;
`

const Th = styled.th`
flex: 1;
display:flex;
text-align: flex-start;
padding-bottom: 2.5rem;
`

const Hr = styled.hr`
width: 100%;
border: 0.1px solid #E8E7E6;
background-color: rgba(232, 231, 230, 0.5);
`

const Td = styled.td`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const P = styled.p`
font-size: 2.5rem;
font-weight: 400;
padding-right: 0.3rem;
`

const PagesDiv = styled.div`
display: flex;
font-size: 1.3rem;
align-items: center;
margin: 0 4rem;
padding-top: 3rem;
`

const PageButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
border-radius: 7px;
margin-left: 1px;
margin-right: 1px;
width: 2.7rem;
height: 2.7rem;
text-align: center;
border: 2px solid #f7f7f7;
background-color: #fff;
color: #000;
font-size: 1.3rem;
font-weight: 600;
`

const TrConstructor = (props) => {

    return (
        <Tr>
            <Td>{props.name}</Td>
            <Td>{props.parkedAmount}</Td>
            <Td>{props.time}</Td>
            <Td>{props.date}</Td>
            <Td><Img src={eye}/></Td>
        </Tr>
    )

}

function App() {

    const [ modalVisible, setModalVisible ] = useState(false);

    const handleModalVisible = () => {

        if (modalVisible === true) {

            setModalVisible(false);

        }
        else {

            setModalVisible(true);

        }

    }

    return (
        <Container>
        <Column>
            <Row className='search' style={{marginTop: '3.5rem'}}>
                <SearchInput placeholder='Digite um nome...'/>
                <SearchButton><Img src={search}/></SearchButton><AddButton onClick={handleModalVisible}><P style={{color:'#fff'}}>+</P>Adicionar novo</AddButton>
            </Row>
            <Column>
                <Table>
                    <Tr style={{marginTop: '1.5rem', marginBottom: '1.5rem;'}}>
                        <Th>Nome</Th>
                        <Th>Qtd. carros estacionados</Th>
                        <Th>Tempo médio por carro</Th>
                        <Th>Data de cadastro</Th>
                        <Th></Th>
                    </Tr>
                    <Hr />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                    <TrConstructor name='José da Silva Motta' parkedAmount='24' time='6m' date='20/07/2022' />
                </Table>
            </Column>

            <PagesDiv className='pages-div'>
                <PageButton onClick={()=> {console.log('a')}}>1</PageButton>
                ...
                <PageButton>3</PageButton>
                <PageButton className='active'>4</PageButton>
                <PageButton>5</PageButton>
                ...
                <PageButton>43</PageButton>
            </PagesDiv>

        </Column>
    {modalVisible === true && <Modal handleModalVisible={handleModalVisible} />}
    </Container>
    )
    
}

export default App;