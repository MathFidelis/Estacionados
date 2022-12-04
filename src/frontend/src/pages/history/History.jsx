import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import eye from '../../assets/images/eye.svg';
import search from '../../assets/images/search.svg';
import '../../components/Global.css'
import './History.css'

    const Tr = styled.tr`
    border-radius: 0.7rem;
    padding: 1rem;
    font-size: 1.2rem;
    display: flex;
    width: 100%;
    `

    const Img = styled.img`
    width: 1.4rem;
    `

const TrConstructor = (props) => {

    const Td = styled.td`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    `

    return (
        <Tr className='history-line'>
            <Td>{props.name}</Td>
            <Td>{props.type}</Td>   
            <Td>{props.date}</Td>
            <Td>{props.timeStarted}</Td>
            <Td>{props.timeFinished}</Td>
            <Td>{props.vehiclePlate}</Td>
            <Td><Img src={eye}/></Td>
        </Tr>
    )

}

function History() {

    const [ history, setHistory ] = useState([]);

    useEffect(()=>{
        setHistory([
            {
                name: 'João Gabriel Peixoto',
                type: 'Saída',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'Henrique Dias',
                type: 'Entrada',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Lucas',
                type: 'Saída',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Gabriel Peixoto',
                type: 'Entrada',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Gabriel Peixoto',
                type: 'Saída',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Gabriel Peixoto',
                type: 'Entrada',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Gabriel Peixoto',
                type: 'Saída',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Gabriel Peixoto',
                type: 'Entrada',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
            {
                name: 'João Gabriel Peixoto',
                type: 'Entrada',
                timeStarted:'14:58:59',
                timeFinished: '15:00:00',
                date:'02/12/2022',
                vehiclePlate:'KJP-0215'
            },
        ]);
    },[])
        
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

    const Table = styled.table`
    border: none;
    width: calc(81vw - 80px);
    margin: 0px 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `



    const Th = styled.th`
    display:flex;
    padding-bottom: 2.5rem;
    flex: 1;
    `

    const Hr = styled.hr`
    width: 100%;
    border: 0.1px solid #E8E7E6;
    background-color: rgba(232, 231, 230, 0.5);
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

    const THead = styled.thead`
    display: flex;
    width: 100%;
    margin: 0px 4rem;
    padding: 0 1rem 1rem;
    justify-content: space-between;
    `
    const TBody = styled.tbody`
    width: 100%;
    `

    return (
        <Container>
            <Column>
                <Row className='search' style={{marginTop: '3.5rem'}}>
                    <SearchInput placeholder='Digite um nome...'/>
                    <SearchButton onClick={()=>{console.log('a')}}><Img src={search}/></SearchButton>
                </Row>
                <Column>
                <Table>
                    <THead>
                        <Tr style={{padding: '1rem 0 0 0', marginTop:'1.5rem'}}>
                            <Th>Nome</Th>
                            <Th>Tipo</Th>
                            <Th>Data</Th>
                            <Th>Horário de Início</Th>
                            <Th>Horário de Término</Th>
                            <Th>Placa do Veículo</Th>
                            <Th style={{width:'20px'}}></Th>
                        </Tr>
                    </THead>
                    <TBody>
                    <Hr />
                        {
                            history.map((item,index) => {
                                return <TrConstructor clasName="history-line"
                                    key={index} name={item.name}
                                    type={item.type}
                                    timeStarted={item.timeStarted}
                                    timeFinished={item.timeFinished}
                                    date={item.date}
                                    vehiclePlate={item.vehiclePlate}
                                />
                            })
                        }
                    </TBody>
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
    </Container>
    )
    
}

export default History;