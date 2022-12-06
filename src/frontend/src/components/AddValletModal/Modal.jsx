import React, { useState } from 'react';
import styled from 'styled-components';
import './Modal.css';

const Inputs = styled.div`
display: flex;
width: 100%;
height: 60%;
padding-top: 1rem; 
flex-direction: column;
`

const Label = styled.label`
font-weight: 300;
font-size: 1.3rem;
margin-bottom: 0.7rem;
margin-top: 0.6rem;
`

const ModalInput = styled.input`
background-color: #EEEEEE;
border: 0;
outline: none;
padding: 1rem;
border-radius: 10px;
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

const Row = styled.div`
display:flex;
`

const P = styled.p`
font-size: 2.5rem;
font-weight: 400;
padding-right: 0.3rem;
`


const ModalBackground = styled.div`
position: fixed;
top:0;
left:0;
right:0;
bottom:0;
display: flex;
padding-left: 4rem;
align-items: center; 
background-color: rgba(0, 0, 0, 0.8);
`

const ModalArea = styled.div`
width: 40%;
height: 93%;
display: flex;
flex-direction: column;
padding: 3rem 4rem 0 4rem;
background-color: #fff;
border-radius: 16px;
`

const AddValletButton = styled(CloseButton)`
width: 18rem;
background-color: #70D44B; 
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



function Modal(props) {

    const addVallet = async () => {

        let names = user_name.split(' ');
        const requestSettings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: names[0],
                last_name: names[(names.length)-1],
                cpf: cpf,
                identity_number: identityNumber,

            })
        }
        console.log(
            `
            primeiro nome: ${names[0]}
            último nome: ${names[names.length-1]}
            cpf: ${cpf}
            RG: ${identityNumber}
            nascimento: ${birthDate}
            carteira: ${driverLicenseType}
            temporário: ${isTemporary}
            `
        )

        // const response = await fetch('http://api.estapar.code.br.com:1337/api/v1/user', requestSettings)
        
        // nome: ${user_name}
        // cpf: ${cpf}
        // rg: ${identityNumber}
        // data de nascimento: ${birthDate}
        // carteira: ${driverLicenseType}
        // tipo: ${isTemporary}
    
    }

    const [ user_name, setName ] = useState('');
    const [ cpf, setCpf ] = useState('');
    const [ identityNumber, setIdentityNumber ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');
    const [ driverLicenseType, setDriverLicenseType ] = useState('');
    const [ isTemporary, setIsTemporary ] = useState(false);
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleCpf = (e) => {
        setCpf(e.target.value);
    }
    const handleIdentityNumber = (e) => {
        setIdentityNumber(e.target.value);
    }
    const handleBirthDate = (e) => {
        setBirthDate(e.target.value);
    }
    const handleDriverLicenseType = (e) => {
        setDriverLicenseType(e.target.value);
    }
    const handleIsTemporary = (e) => {
        if (e.target.value == 'Temporário') {
            setIsTemporary(true)
        }
        else {
            setIsTemporary(false)
        }
    }
    

    return (
        <ModalBackground>
            <ModalArea>
                <P style={{fontWeight:'700'}}>Adicionar novo</P>
                <P style={{fontSize: '1.4rem', marginTop: '2rem'}}><b style={{marginRight: '0.4rem'}}>Crie</b>manobristas na plataforma e otimize a tomada <br />de ordens de serviço</P>
                <Inputs>
                    <Label htmlFor='name'>Nome</Label>
                    <ModalInput value={user_name} onChange={handleName} className='modal-input' placeholder='José da Silva' />
                    <Label htmlFor='cpf'>CPF</Label>
                    <ModalInput onChange={handleCpf} type={'text'} className='modal-input' name='cpf' placeholder='000.000.000-00' />
                    <Label htmlFor='identity-number'>Identidade</Label>
                    <ModalInput onChange={handleIdentityNumber} type={'text'} className='modal-input' name='identity-number' placeholder='000.000-00' />
                    <Label htmlFor='birth-date'>Data de nascimento</Label>
                    <ModalInput onChange={handleBirthDate} type={'text'} className='modal-input' name='birth-date' placeholder='DD/MM/YYYY' />
                    <Label htmlFor='driver-license-type'>Tipo de carteira de habilitação</Label>
                    <Select onChange={handleDriverLicenseType}>
                        <Option value={'A'}>A</Option>
                        <Option value={'B'}>B</Option>
                        <Option value={'AB'}>AB</Option>
                    </Select>
                    <Label htmlFor='isTemporary'>Tipo do manobrista</Label>
                    <Select onChange={handleIsTemporary}>
                        <Option value={'Temporário'}>Temporário</Option>
                        <Option>Efetivado</Option>
                    </Select>
                    <Row style={{justifyContent:'space-between', paddingTop:'1.3rem'}}>
                        <CloseButton onClick={props.handleModalVisible}>Fechar</CloseButton>
                        <AddValletButton onClick={addVallet}>Adicionar manobrista</AddValletButton>
                    </Row>
                </Inputs>
            </ModalArea>
        </ModalBackground>
    )

}

export default Modal;