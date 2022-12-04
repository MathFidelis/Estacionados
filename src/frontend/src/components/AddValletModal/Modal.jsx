import React, { useState } from 'react';
import styled from 'styled-components';
import './Modal.css';

function Modal(props) {

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

    const [ name, setName ] = useState('');
    const handleName = (e) => {
        setName(e.target.value);
    }

    return (
        <ModalBackground>
            <ModalArea>
                <P style={{fontWeight:'700'}}>Adicionar novo</P>
                <P style={{fontSize: '1.4rem', marginTop: '2rem'}}><b style={{marginRight: '0.4rem'}}>Crie</b>manobristas na plataforma e otimize a tomada <br />de ordens de serviço</P>
                <Inputs>
                    <Label htmlFor='name'>Nome</Label>
                    <ModalInput value={name} onChange={handleName} className='modal-input' placeholder='José da Silva' />
                    <Label htmlFor='cpf'>CPF</Label>
                    <ModalInput onChange={()=>{console.log('a')}} type={'text'} className='modal-input' name='cpf' placeholder='000.000.000-00' />
                    <Label htmlFor='identity-number'>Identidade</Label>
                    <ModalInput onChange={()=>{console.log('a')}} type={'text'} className='modal-input' name='identity-number' placeholder='000.000-00' />
                    <Label htmlFor='birth-date'>Data de nascimento</Label>
                    <ModalInput onChange={()=>{console.log('a')}} type={'text'} className='modal-input' name='birth-date' placeholder='DD/MM/YYYY' />
                    <Label htmlFor='driver-license-type'>Tipo de carteira de habilitação</Label>
                    <Select  defaultValue={''} onChange={()=>{console.log("A")}}>
                        <Option>A</Option>
                        <Option>B</Option>
                        <Option>AB</Option>
                    </Select>
                    <Label htmlFor='isTemporary'>Tipo do manobrista</Label>
                    <Select onChange={()=>{console.log("A")}}>
                        <Option>Temporário</Option>
                        <Option>Efetivado</Option>
                    </Select>
                    <Row style={{justifyContent:'space-between', paddingTop:'1.3rem'}}>
                        <CloseButton onClick={props.handleModalVisible}>Fechar</CloseButton>
                        <AddValletButton>Adicionar manobrista</AddValletButton>
                    </Row>
                </Inputs>
            </ModalArea>
        </ModalBackground>
    )

}

export default Modal;