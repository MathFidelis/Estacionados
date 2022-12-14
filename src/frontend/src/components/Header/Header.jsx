import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Header(props) {
    const P = styled.p`
    font-size: 2.4rem;
    font-weight: 400;
    `
    
    const Header = styled.div`
    display: flex;
    flex-direction: column;
    width: 81vw;
    height: 16vh;
    padding: 3rem 0 0 4rem;
    min-width: 20rem;
    `
    
    const EmployeeRole = styled(P)`
    text-align: right;
    margin-top: 5px;
    font-size: 1.4rem;
    `
    
    const Img = styled.img`
    width: 6rem;
    height: 6rem;
    margin-left: 2rem;
    border-radius: 100%;
    `
    const RightSide = styled.div`
    display: flex;
    text-align: flex-end;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    `
    
    const PBold = styled(P)`
    margin-top: 1rem;
    font-size: 3rem;
    font-weight: 700;
    `
    
    const EmployeeName = styled(PBold)`
    text-align: right;
    font-size: 1.4rem;
    
    `
    
    const Chevron = styled.button`
    display: inline-block;
    margin-right: 6rem;
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: '';
    position: relative;
    margin-left: 1.5rem;
    min-height: 8px;
    transform: rotate(-225deg);
    min-width: 8px;
    cursor: pointer;
    text-decoration: none;
    `
    
    const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    `
    
    const Div = styled.div`
    display: flex;
    justify-content: space-between;
    `

    const [ userData, setUserData ] = useState({});
    
    async function getUserData() {

        let id = sessionStorage.getItem('user_id');
        let token = sessionStorage.getItem('token');
        const requestSettings = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        };
        fetch(`http://api.estapar.code.br.com:1337/api/v1/user/${id}`, requestSettings)
        .then(response => {
            return response.json()
        })
        .catch(error => {
    
            console.log(error);
    
        }).then(data => setUserData(data.success.data))
        .catch(error => {
            console.error("Error fetching data: ", error)
        })
    }

    // useEffect(()=>{
    //     getUserData();
    // }, [])

    const UserRole = () => {
        console.log(userData);
        if (userData.role == "manager") {
            return <>Administrador da Unidade</>
        } 
        else if (userData.role == "attendant") {
            return <>Atendente</>
        }
        return <>Manobrista</>
    }

    return <>
        <Header>
            <Div>
                <Column>
                    <P>Estapar</P>
                    <PBold style={{marginTop:'2rem'}}>{props.title}</PBold>
                </Column>
                <RightSide>
                <Column>
                    <EmployeeName>{userData.first_name} {userData.last_name}</EmployeeName>
                    <EmployeeRole>
                        <UserRole />
                    </EmployeeRole>
                </Column>
                <Img src={props.img} />
                <Chevron/>
                </RightSide>
            </Div>
        </Header>
    </>

}

export default Header;