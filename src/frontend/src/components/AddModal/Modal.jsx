import React, { useState } from 'react';
import styled from 'styled-components';


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

        return (
            <ModalBackground>
                <ModalArea>
                    <P style={{fontWeight:'700'}}>Adicionar novo</P>
                    <P style={{fontSize: '1.4rem', marginTop: '2rem'}}><b style={{marginRight: '0.4rem'}}>Crie</b>manobristas na plataforma e otimize a tomada <br />de ordens de serviço</P>
                    <Inputs>
                        <Label for='name'>Nome</Label>
                        <ModalInput type={'text'} className='modal-input' name='name' placeholder='José da Silva' />
                        <Label for='name'>CPF</Label>
                        <ModalInput type={'text'} className='modal-input' name='name' placeholder='000.000.000-00' />
                        <Label for='name'>Identidade</Label>
                        <ModalInput type={'text'} className='modal-input' name='name' placeholder='000.000-00' />
                        <Label for='name'>Data de nascimento</Label>
                        <ModalInput type={'text'} className='modal-input' name='name' placeholder='DD/MM/YYYY' />
                        <Label for='name'>Tipo de carteira de habilitação</Label>
                        <ModalInput type={'text'} className='modal-input' name='name' placeholder='AB' />
                        <Label for='name'>Tipo do manobrista</Label>
                        <ModalInput type={'text'} className='modal-input' name='name' placeholder='Temporário' />
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