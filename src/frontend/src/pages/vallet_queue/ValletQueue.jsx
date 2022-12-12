import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AcceptOS from '../../components/order_of_service/AcceptOS';
import './ValletQueue.css';

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

const Column = styled.div`
display: flex;
flex-direction: Column;
font-size: 13px;
`

const Main = styled.main`
display: flex;
width: 100%;
grid-gap: .5rem;
flex-wrap: wrap;
padding-top: 4rem;
`

function ValletQueue() {

    const handleAcceptOS = (e) => {
        setSelectedOS(e.target.id);
        handleModalVisible();
    }

    const PlateConstructor = (props) => {

        const Plate = styled.button`
        font-size: 20px;
        border-radius: 10px;
        font-weight: 400;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        border: none;
        background-color: #24272A;
        color: #fff;
        height: 7rem;
        width: 18rem;
        padding: 1.5rem;
        `

        const Time = styled.p`
        font-size: 10px;
        width: 100%;
        text-align: left;
        `

        return (
        
        <Plate type="button" id={props.id}  onClick={handleAcceptOS}>
            {props.plate}
            <Time>há {props.time} minutos</Time>
        </Plate>

        )
    }

    
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ pendingOS, setPendingOS ] = useState([]);
    const [ selectedOS, setSelectedOS ] = useState('');

    const handleModalVisible = () => {
        if (modalVisible == true) {
            setModalVisible(false);
        }
        else {
            setModalVisible(true);
        }
    }

    useEffect(()=>{

        const handleGetTime = setInterval(()=> {
            setCurrentDate(new Date().getTime());
        }, 60000);

        let token = sessionStorage.getItem('token');
        const requestSettings = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    
        fetch('http://api.estapar.code.br.com:1337/api/v1/order-of-service?status=pending', requestSettings)
        .then(response => {
            return response.json()
        })
        .catch(error => {
    
            console.log(error);
    
        }).then(data => setPendingOS(data.success.data))
        .catch(error => {
            console.error("Error fetching data: ", error)
        })

        return () => clearInterval(handleGetTime);
    }, [])

    return (
        <Container>
            <Column>
                <P>Estapar</P>
                <PBold>Ordens de serviço pendentes</PBold>
            </Column>
            <Main>
                {
                    pendingOS.map((item, index) => {

                        let created_at = new Date(item.created_at);
                        let difference = parseInt((currentDate - created_at)/(1000 * 60));

                        return (
                            <PlateConstructor 
                                id={item.id}
                                key={index}
                                plate={item.vehicle_plate}
                                time={difference}
                            />
                        )
                    })
                }
            </Main>
            {modalVisible === true && 
                <AcceptOS 
                    id={selectedOS}
                    handleModalVisible={handleModalVisible} 
                />}
        </Container>
    )

}

export default ValletQueue;