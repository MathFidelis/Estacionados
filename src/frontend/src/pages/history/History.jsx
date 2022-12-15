import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import eye from '../../assets/images/eye.svg';
import search from '../../assets/images/search.svg';
import '../../components/Global.css';
import './History.css';
import AddOS from '../../components/add_order/AddOS';

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

const CreateOS = styled.button`
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

const Border = styled.tr`
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
height: 49.7vh;
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

    const [ historyList, setHistoryList ] = useState([]);
    const [ name, setName ] = useState('');
    const handleName = (e) => {
        setName(e.target.value);
    }

    const [ modalVisible, setModalVisible ] = useState(false);
    const handleModalVisible = () => {
        if (modalVisible == false) {
            setModalVisible(true);
        }
        else {
            setModalVisible(false);
        }
    }

    useEffect(()=>{

    let token = sessionStorage.getItem('token');
    const requestSettings = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }

    fetch('http://api.estapar.code.br.com:1337/api/v1/order-of-service?status=finished', requestSettings)
    .then(response => {
        return response.json()
    })
    .catch(error => {

        console.log(error);

    })
    .then(data => setHistoryList(data.success.data))
    .catch(error => {
        console.error("Error fetching data: ", error)
    })
}, [])

    const getMonthDate = (time) => {
        let date = new Date(time);
        return (`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`)
    }

    const getHourMinute = (time) => {
        let date = new Date(time);
        return (`${date.getHours()}:${date.getMinutes()}`)
    }

    return (
        <Container>
            <Column>
                <Row className='search' style={{marginTop: '3.5rem'}}>
                    <SearchInput placeholder='Digite um nome...' onChange={handleName} />
                    <SearchButton onClick={()=>{console.log(name)}}><Img src={search}/></SearchButton>
                    <CreateOS onClick={handleModalVisible}><P style={{color:'#fff'}}>+</P>Adicionar novo</CreateOS>
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
                        {
                            historyList.map((item,index) => {
                                console.log(item);
                                return <TrConstructor clasName="history-line"
                                    key={index} 
                                    name={`${item.user.first_name} ${item.user.last_name}`}
                                    type={item.type === 'entry' ? 'Entrada' : 'Saída'}
                                    date={getMonthDate(item.created_at)}
                                    timeStarted={getHourMinute(item.accepted_at)}
                                    timeFinished={getHourMinute(item.finished_at)}
                                    vehiclePlate={item.vehicle_plate}
                                />
                            })
                        }
                    </TBody>
                </Table>
                </Column>
                <PagesDiv className='pages-div'>
                    <PageButton className='active'>1</PageButton>
                    <PageButton>2</PageButton>
                    <PageButton>3</PageButton>
                    <PageButton>4</PageButton>
                    <PageButton>5</PageButton>
                </PagesDiv>
            </Column>
            {modalVisible && <AddOS handleModalVisible={handleModalVisible} />}
    </Container>
    )
    
}

export default History;