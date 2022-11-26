import React from 'react';
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
    return <>
        <Header>
            <Div>
                <Column>
                    <P>Estapar</P>
                    <PBold style={{marginTop:'2rem'}}>{props.title}</PBold>
                </Column>
                <RightSide>
                <Column>
                    <EmployeeName>{props.name}</EmployeeName>
                    <EmployeeRole>{props.role}</EmployeeRole>
                </Column>
                <Img src={props.img} />
                <Chevron/>
                </RightSide>
            </Div>
        </Header>
    </>

}

export default Header;