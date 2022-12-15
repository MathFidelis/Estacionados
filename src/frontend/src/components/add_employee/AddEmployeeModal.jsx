import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import styled from "styled-components";
import ModalStructure from "../modal_structure/Modal";
import "./AddEmployeeModal.css";

const Inputs = styled.div`
display: flex;
width: 100%;
height: 100%;
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
width: 100%;
`

const LinkRFIDRow = styled(Row)`
justify-content: flex-end;
align-items: center;
`

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

const Button = styled(CloseButton)`
width: 18rem;
background-color: #70D44B; 
`

const LinkRFID = styled(Button)`
width: 100%;
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

const Bold = styled.b`
margin-right: 0.4rem;
`

const Bottom = styled.div`       
display: flex;
height: 100%;
align-items: flex-end;
justify-content: space-between;
`

const DynamicInputs = styled.div`
display: flex;
width: 100%;
height: 100%;
flex-direction: column;
`

function UserInputs(props) {
    
    if (props.role == 'valet') {
        
        return (
            <DynamicInputs>
                <Label htmlFor="name">Nome</Label>
                <ModalInput onChange={props.handleEmployeeName} className="modal-input" placeholder="José da Silva" />
                <Label htmlFor="cpf">CPF</Label>
                <ModalInput type={"text"} onChange={props.handleEmployeeCpf} className="modal-input" name="cpf" placeholder="000.000.000-00" />
                <Row style={{justifyContent: 'space-between'}}>
                    <Label htmlFor="driver-license-type">Tipo de CNH</Label>
                    <Row style={{width: '50%', justifyContent: 'flex-start'}}>
                        <Label>E-mail</Label>
                    </Row>
                </Row>
                <Row style={{justifyContent: 'space-between'}}>
                    <Select style={{width: '15rem'}} onChange={props.handleLicenseType}>
                        <Option value={"A"}>A</Option>
                        <Option value={"B"}>B</Option>
                        <Option value={"AB"}>AB</Option>
                    </Select>
                        <ModalInput style={{width: '50%'}} placeholder="manobrista@estapar.com" onChange={props.handleEmployeeEmail} />
                </Row>
                <Row style={{justifyContent: 'space-between'}}>
                    <Label htmlFor="employee-type">Tipo do manobrista</Label>
                    <Row style={{width: '50%', justifyContent: 'flex-start'}}>
                        <Label>Senha</Label>
                    </Row>
                </Row>
                <Row style={{justifyContent: 'space-between'}}>
                    <Select style={{width: '15rem'}} id="employee-type" onChange={props.handleEmployeeType}>
                        <Option>Temporário</Option>
                        <Option>Efetivado</Option>
                    </Select>
                    <ModalInput type={"password"} style={{width: '50%'}} placeholder="********" onChange={props.handleEmployeePassword} />
                </Row>
                <Label htmlFor="name">Tag RFID</Label>
                <ModalInput id="RFID-Input" onChange={props.handleRFIDTag} className="modal-input" />
            </DynamicInputs>
        )
        
    }    
    else {
        return (
            <DynamicInputs>
                <Label htmlFor="name">Nome</Label>
                <ModalInput onChange={props.handleEmployeeName} className="modal-input" placeholder="José da Silva" />
                <Label htmlFor="email">E-mail</Label>
                <ModalInput placeholder="gerente@estapar.com" onChange={props.handleEmployeeEmail} />
                <Label htmlFor="password">Senha</Label>
                <ModalInput type={"password"}placeholder="********" onChange={props.handleEmployeePassword} />
                <Label htmlFor="cpf">CPF</Label>
                <ModalInput type={"text"} onChange={props.handleEmployeeCpf} className="modal-input" name="cpf" placeholder="000.000.000-00" />
            </DynamicInputs>
        )
    }    

}

function AddEmployeeModal(props) {

    const roleOptions = [
        {
            name: "Gerente",
            value: "manager"
        },
        {
            name: "Manobrista",
            value: "valet"
        }
    ]
 
    const [ employeeRole, setEmployeeRole ] = useState(roleOptions[0].value);
    const [ employeeName, setEmployeeName ] = useState('');
    const [ employeeCpf, setEmployeeCpf ] = useState('');
    const [ RFIDTag, setRFIDTag ] = useState('');
    const [ licenseType, setLicenseType ] = useState('');
    const [ employeeType, setEmployeeType ] = useState(false);
    const [ employeeEmail, setEmployeeEmail ] = useState('');
    const [ employeePassword, setEmployeePassword ] = useState('');

    const addEmployee = () => {
        let employeeData = {};
        let names = employeeName.split(' ');
        let rfid_tag = sessionStorage.getItem('rfid');
        if (employeeRole == 'valet') {

            employeeData = {
                email: employeeEmail,
                password: employeePassword,
                role: employeeRole,
                first_name: names[0],
                last_name: names[(names.length)-1],
                cpf: employeeCpf,
                type_of_driver_license: licenseType,
                is_temporary_employee: employeeType,
                date_of_birth: "12/19/2004",
                identity_number: "10043285",
                rfid: rfid_tag
            }
            
        }
        else {
            
            employeeData = {
                email: employeeEmail,
                password: employeePassword,
                role: employeeRole,
                first_name: names[0],
                last_name: names[(names.length)-1],
                cpf: employeeCpf,
                is_temporary_employee: employeeType,
                date_of_birth: "12/19/2004",
                identity_number: "10043285",
                type_of_driver_license: '999',
                rfid: 'RFIDTag'
            }

        }

        const requestSettings = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData)
        }

        console.log(requestSettings.body);
    
        fetch('http://api.estapar.code.br.com:1337/api/v1/user', requestSettings)
        .then(response => {

            if (response.status == 201) {
                props.handleModalVisible();
                props.toast();
            }
            else {
                props.errorToast();
            }
            return response.json()
        })
        .catch(error => {
    
            console.log(error);
    
        })
    
    }

    const handleEmployeeName = (e) => {
        setEmployeeName(e.target.value);
    }
    const handleEmployeeRole = (e) => {
        setEmployeeRole(e.target.value);
    }
    const handleEmployeeEmail = (e) => {
        setEmployeeEmail(e.target.value);
        console.log(employeeEmail);
    }
    const handleEmployeePassword = (e) => {
        setEmployeePassword(e.target.value);
    }
    const handleEmployeeCpf = (e) => {
        setEmployeeCpf(e.target.value);
    }
    const handleRFIDTag = (e) => {
        setRFIDTag(e.target.value);
    }
    const handleLicenseType = (e) => {
        setLicenseType(e.target.value);
    }
    const handleEmployeeType = (e) => {
        if (employeeType == false) {
            setEmployeeType(true);
        }
        else {
            setEmployeeType(false)
        }
    }

    return (
        <ModalStructure>
            <Title>Adicionar novo</Title>
            <Subtitle><Bold>Crie</Bold>manobristas na plataforma e otimize a tomada <br />de ordens de serviço</Subtitle>
            <Inputs>
            <Label htmlFor="employee-role">Função</Label>
                <Select name="employee-role" id="employee-role" onChange={handleEmployeeRole}>
                    {roleOptions.map((item, index) => {
                        return (
                            <Option
                            key={index}
                            value={item.value}>
                                {item.name}
                            </Option>
                        )
                    })}
                </Select>
                <UserInputs 
                handleEmployeeCpf={handleEmployeeCpf}
                handleEmployeeName={handleEmployeeName}
                handleRFIDTag={handleRFIDTag}
                handleLicenseType={handleLicenseType}
                handleEmployeeType={handleEmployeeType}
                handleEmployeeEmail={handleEmployeeEmail}
                handleEmployeePassword={handleEmployeePassword}
                role={employeeRole}
                />
                <Bottom>
                    <Row style={{width: '100%', justifyContent: 'space-between', paddingBottom: '3rem'}}>
                        <CloseButton onClick={props.handleModalVisible}>Fechar</CloseButton>
                        <Button onClick={addEmployee}>Adicionar colaborador</Button>
                    </Row>
                </Bottom>
            </Inputs>
        </ModalStructure>
    )

}

export default AddEmployeeModal;