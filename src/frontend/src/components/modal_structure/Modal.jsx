import React, { useState } from 'react';
import styled from 'styled-components';

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
font-size: 1.1rem;
width: 40%;
height: 93%;
min-width: 440px;
display: flex;
flex-direction: column;
padding: 3rem 4rem 0 4rem;
background-color: #fff;
border-radius: 16px;
position: absolute;
`

function ModalStructure(props) {

    return (
        <ModalBackground>
            <ModalArea>
                {props.children}
            </ModalArea>
        </ModalBackground>
    )

}

export default ModalStructure;