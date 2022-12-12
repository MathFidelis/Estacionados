import React, { useState, useEffect } from 'react';
import ModalStructure from '../modal_structure/Modal';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './AddOS.css';

const Title = styled.p`
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

const Bold = styled.b`
margin-right: 0.4rem;
`

const Label = styled.label`
font-weight: 300;
font-size: 1.3rem;
margin-bottom: 1rem;
margin-top: 1rem;
`

const Select = styled.select`
padding: 10px;
border-radius: 10px;
border: none;
background-color: #EEEEEE;
border-right: 10px solid transparent;
`

const Option = styled.option`
padding: 1rem;
height: 200px;
`

const Input = styled.input`
background-color: #EEEEEE;
border: 0;
outline: none;
padding: 1rem;
border-radius: 10px;
`

const Main = styled.main`
display: flex;
flex-direction: column;
height: 100%;
padding-top: 3rem;
`

const Row = styled.div`
display: flex;
`

const Column = styled.div`
display: flex;
width: 100%;
flex-direction: column;
`

const CloseButton = styled.button`
padding: 1rem;
margin-top: 1rem;
background-color: #CECECE;
border: none;
outline: none;
color: #fff;
font-weight: 600;
border-radius: 10px;
`

const AddOSButton = styled(CloseButton)`
width: 100%;
background-color: #70D44B; 
margin-left: 1rem;
`

function AddOS(props) {

    const postOS = () => {
        
        const data = {
            vehicle_color: vehicleColor,
            vehicle_plate: vehiclePlate,
            type: osType
        }
        
        
            let token = sessionStorage.getItem('token');
            const requestSettings = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            }
        
            fetch('http://api.estapar.code.br.com:1337/api/v1/order-of-service?status=accepted', requestSettings)
            .then(response => {
                console.log(response.json());
                successToast();
            })
            .catch(error => {
        
                console.log(error);
        
            })
    }

    const [ vehicleColor, setVehicleColor ] = useState('white');
    const [ vehiclePlate, setVehiclePlate ] = useState('');
    const [ osType, setOsType ] = useState('entry');

    const successToast = () => {
        toast.success('Ordem de serviço criada com sucesso!', {
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

    const handleVehicleColor = (e) => {
        setVehicleColor(e.target.value);
    }
    
    const handleVehiclePlate = (e) => {
        setVehiclePlate(e.target.value);
    }
    const handleOsType = (e) => {
        setOsType(e.target.value);
    } 

    return (
        <ModalStructure>
            <Title>Adicionar novo</Title>
            <Subtitle><Bold>Crie</Bold>uma nova ordem de serviço.</Subtitle>
            <Main className='content'>
                <Column>
                    <Label>Tipo da ordem de serviço</Label>
                    <Select onChange={handleOsType}>
                        <Option value={'entry'}>Entrada</Option>
                        <Option value={'exit'}>Saída</Option>
                    </Select>
                    <Label>Placa do veículo</Label>
                    <Input onChange={handleVehiclePlate} id="os-kind" placeholder='AAA-0A00'/>
                    <Label>Cor do veículo</Label>
                    <Select onChange={handleVehicleColor}>
                        <Option value={'white'}>Branco</Option>
                        <Option value={'red'}>Vermelho</Option>
                    </Select>   
                </Column>
                <Row style={{height: '100%', alignItems:'flex-end', paddingBottom: '3rem'}}>
                    <CloseButton onClick={props.handleModalVisible}>Fechar</CloseButton>
                    <AddOSButton onClick={postOS}>Criar ordem de serviço</AddOSButton>
                </Row>
            </Main>
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
        </ModalStructure>
    )

}

export default AddOS;