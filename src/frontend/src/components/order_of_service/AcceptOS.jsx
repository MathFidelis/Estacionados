import React, { useState, useEffect } from 'react';
import ModalStructure from "../modal_structure/Modal";
import styled from 'styled-components';
import './AcceptOS.css';
import { ToastContainer, toast } from 'react-toastify';

const Title = styled.p`
font-size: 2.5rem;
font-weight: 700;
padding-right: 0.3rem;
`

const Subtitle = styled.p`
font-size: 1.4rem;
margin-top: 1rem;
font-weight: 400;
padding-right: 0.3rem;
`

const Bold = styled.b`
margin-right: 0.4rem;
`

const Row = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
margin-bottom: 1rem;
`

const Column = styled.div`
display: flex;
flex-direction: column;
`

const OSDescription = styled.div`
margin-top: 3.5rem;
font-size: 1.3rem;
`

const Attribute = styled.p`
font-weight: 600;
`

const Value = styled.p`
text-transform: uppercase;
color: #24272A;
`

const Form = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
justify-content: flex-end;
`

const Label = styled.label`
margin-bottom: 1rem;
`

const Select = styled.select`
padding: 10px;
border-radius: 10px;
margin-bottom: 1rem;
border: none;
background-color: #EEEEEE;
border-right: 10px solid transparent;
`

const Option = styled.option`
`

const Input = styled.input`
background-color: #EEEEEE;
margin-bottom: 1rem;
border: 0;
outline: none;
padding: 1rem;
border-radius: 10px;
`

const CloseButton = styled.button`
padding: 1rem;
margin-top: 1rem;
text-align: center;
background-color: #CECECE;
border: none;
outline: none;
margin-bottom: 2.5rem;
color: #fff;
height: 4rem;
font-weight: 600;
border-radius: 10px;
`

const AcceptButton = styled.button`
background-color: #70D44B; 
height: 4rem;
display: flex;
justify-content: center;
font-weight: 600;
align-items: center;
border: none;
border-radius: 10px;
margin-top: 1rem;
color: #fff;
width: 80%;
`

function AcceptOS(props) {

    useEffect(() => {

        let token = sessionStorage.getItem('token');
    
        const requestSettings = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        fetch(`http://api.estapar.code.br.com:1337/api/v1/user?role=valet`, requestSettings).then((response) => {
            return response.json();
        }).then((data) => {
            setValletsList(data.success.data);
        })

        fetch(`http://api.estapar.code.br.com:1337/api/v1/order-of-service/${props.id}`, requestSettings).then((response) => {
            return response.json();
        }).then((data) => {
            setCurrentOS(data.success.data);
        })


    }, [])

    const [ currentOS, setCurrentOS ] = useState([]);
    const [ valletsList, setValletsList ] = useState([]);
    const [ valletEmail, setValletEmail ] = useState('');
    const [ valletPassword, setValletPassword ] = useState('');
    const handleValletEmail = (e) => {
        setValletEmail(e.target.value);
    }
    const handleValletPassword = (e) => {
        setValletPassword(e.target.value);
    }
    const successToast = () => {
        toast.success('Ordem de serviço aceita com sucesso!', {
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
    const postData = async (id) => {

            const requestSettings = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:valletEmail,
                    password: valletPassword})
            }
            console.log(valletEmail)
            const response = await fetch('http://api.estapar.code.br.com:1337/api/v1/user/auth', requestSettings)
            const json = await response.json();
            if (json.status == 200) {
                console.log(json.success.data);
                sessionStorage.setItem('vallet_token', json.success.data.token);
                sessionStorage.setItem('vallet_id', json.success.data.id);
            }

            let valletToken = sessionStorage.getItem('vallet_token');

            console.log("Valet token: " + valletToken);

            const acceptSettings = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${valletToken}`
                }
            }
            console.log(`props.id: ${props.id}`)
            let vallet_id = sessionStorage.getItem('vallet_id');
            fetch(`http://api.estapar.code.br.com:1337/api/v1/order-of-service/accept/${props.id}`, acceptSettings)
            .then(response => {
                successToast();
                return response.json();
            })
            .catch(error => {
        
                console.log(error);
        
            }).then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error)
            })
    }

    return (

        <ModalStructure>
            <Title>Aceitar ordem</Title>
            <Subtitle><Bold>Aceite</Bold>uma ordem de serviço</Subtitle>
            <OSDescription>
                <Row>
                    <Attribute>Tipo</Attribute>
                    <Value>{currentOS.type}</Value>
                </Row>
                <Row>
                    <Attribute>Placa do Veículo</Attribute>
                    <Value>{currentOS.vehicle_plate}</Value>
                </Row>
                <Row>
                    <Attribute>Cor</Attribute>
                    <Value>{currentOS.vehicle_color}</Value>
                </Row>
            </OSDescription>
            <Form>
                <Label htmlFor='vallet_name'>Quem é você?</Label>
                <Select id='vallet_name' name='vallet_name' onChange={handleValletEmail}>
                    <Option>Selecione seu email</Option>
                   {
                    valletsList.map((item, index)=> {
                            return (
                                <Option key={index}>
                                    {item.email}
                                </Option>
                            )
                    })
                   }
                </Select>
                <Label htmlFor='vallet_password'>Digite sua senha:</Label>
                <Input id='vallet_password' onChange={handleValletPassword} name='vallet_password' type="password" placeholder="***********" />
                <Row style={{justifyContent:'space-between'}}>
                    <CloseButton onClick={props.handleModalVisible}>Fechar</CloseButton>
                    <AcceptButton onClick={postData}>Aceitar ordem de serviço</AcceptButton>
                </Row>
            </Form>
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

export default AcceptOS;