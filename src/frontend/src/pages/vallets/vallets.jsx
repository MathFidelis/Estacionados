import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import styled from 'styled-components';
import character from '../../assets/images/character.png';
import eye from '../../assets/images/eye.svg';
import search from '../../assets/images/search.svg';
import AddEmployeeModal from '../../components/add_employee/AddEmployeeModal';
import './Vallets.css';

const Container = styled.div`
display: flex;
`

const Column = styled.div`
display: flex;
min-height: 398px;
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
border-radius: 0.7rem;
padding: 1rem;
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

const Border = styled.tr`
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
        <Tr className='vallet-line'>
            <Td>{props.name}</Td>
            <Td>{props.parkedAmount}</Td>
            <Td>{props.time}</Td>
            <Td>{props.date}</Td>
            <Td><Img src={eye}/></Td>
        </Tr>
    )

}

function App() {

    const [ valletsList, setValletsList ] = useState([]);

    useEffect(() => {

        let token = sessionStorage.getItem('token');

        const requestSettings = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        fetch('http://api.estapar.code.br.com:1337/api/v1/user?role=valet', requestSettings)
        .then(response => {
            return response.json()
    })
    .catch(error => {

        console.log(error);

    }).then(data => setValletsList(data.success.data))
    .catch(error => {
        console.error("Error fetching data: ", error)
    })

}, [])


    const [ filterVallet, setFilterVallet ] = useState('');
    const [ modalVisible, setModalVisible ] = useState(false);

    const handleFilterVallet = (e) => {
        setFilterVallet(e.target.value);
    }
    
    const filterVallets = () => {
        console.log(filterVallet)
    }

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
                <SearchInput onChange={handleFilterVallet} placeholder='Digite um nome...'/>
                <SearchButton onClick={()=>{console.log(filterVallet)}}>
                    <Img src={search}/>
                </SearchButton>
                <AddButton onClick={handleModalVisible}>
                    <P style={{color:'#fff'}}>+</P>
                    Adicionar novo
                </AddButton>
            </Row>
            <Column>
                <Table>
                    <THead>
                        <Tr style={{padding: '1rem 0 0 0', marginTop:'1.5rem'}}>
                        <Th className="th-cell">Nome </Th>
                        <Th className="th-cell">Qtd. carros estacionados</Th>
                        <Th className="th-cell">Tempo médio por carro</Th>
                        <Th className="th-cell">Data de cadastro</Th>
                        <Th className="th-cell"></Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {valletsList.map((item, index) => {
                            return <TrConstructor key={index} 
                                    name={item.first_name + ' ' + item.last_name}
                                    parkedAmount={'-'}
                                    time={'-'}
                                    date={item.created_at.split('T')[0]}
                                />  
                        })}
                    </TBody>
                </Table>
            </Column>

            <PagesDiv className='pages-div'>
                <PageButton className='active'>1</PageButton>
                <PageButton>2</PageButton>
                <PageButton>4</PageButton>
                <PageButton>3</PageButton>
                <PageButton>4</PageButton>
            </PagesDiv>

        </Column>
        {modalVisible === true &&
      <AddEmployeeModal 
        handleModalVisible={handleModalVisible} 
      />}
    </Container>
    )
    
}

export default App;