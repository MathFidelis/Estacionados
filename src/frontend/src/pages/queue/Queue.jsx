import React from 'react';
import styled from 'styled-components';
import eye from '../../assets/images/queue-eye.svg';
import './Queue.css';

const Container = styled.div`
display: flex;
flex-direction: column;
padding: 6rem 5rem 0 5rem;
`

const Title = styled.p`
font-size: 2rem;
font-weight: 700;
`

const Subtitle = styled(Title)`
font-weight: 400;
`

const Main = styled.main`
margin-top: 2rem;
display: flex;
`

const Column = styled.div`
flex: 1;
display: flex;
flex-direction: column;
margin-right: 2rem;
`

const Row = styled.div`
display: flex;
`

const ColumnName = styled.p`
font-size: 1.3rem;
`

const Input = styled.input`
height: 3.5rem;
background-color: #EEEEEE;
outline: none;
border: none;
padding-left: 1rem;
border-radius: 10px;
margin-top: 1rem;
`

const Button = styled.button`
background-color: #70D44B;
color: #fff;
height: 4rem;
border: none;
outline: none;
font-weight: 600;
border-radius: 10px;
margin-top: 1.5rem;
`

const LicensePlate = styled.div`
height: 8rem;
background-color: #24272A;
color: #fff;
border-radius: 10px;
display: flex;
justify-content: space-around;
align-items: center;
margin-top: 1.5rem;
`

const DoneLicensePlate = styled(LicensePlate)`
background-color: #70D44B;
`

const P = styled.p`
font-size: 2.5rem;
`

const RightSide = styled.div`
display: flex;
justify-content: flex-end;
`

const Img = styled.img`
width: 3rem;
`

function App() {  

    const LicensePlateConstructor = (props) => {

        return (

            <LicensePlate className='car-plate'>
                <Row>
                <Column stlye={{marginRight:'0'}}>
                    <P>{props.plate}</P>
                    <P style={{fontSize:'1.2rem'}}>
                    há {props.time} minutos
                    </P>
                </Column>
                <RightSide>
                    <Img src={eye}/>
                </RightSide>
                </Row>
            </LicensePlate>

        )

    }

  return <Container>
    <Title>Fila</Title>
    <Subtitle>Ordens de Serviço</Subtitle>
    <Main>
      <Column>
        <ColumnName>Placa do veículo</ColumnName>
        <Input placeholder='AAA-2A22'/>
        <Button>Buscar</Button>
      </Column>
      <Column>
        <ColumnName>Aguardando estacionar</ColumnName>
          <LicensePlateConstructor plate='KJP-0215' time='2'/>
          <LicensePlate className='car-plate'>
            <Row>
              <Column stlye={{marginRight:'0'}}>
                <P>AAA-2A22</P>
                <P style={{fontSize:'1.2rem'}}>
                  há 2 minutos
                </P>
              </Column>
              <Img src={eye}/>
            </Row>
          </LicensePlate>
          <LicensePlate className='car-plate'>
            <Row>
              <Column stlye={{marginRight:'0'}}>
                <P>AAA-2A22</P>
                <P style={{fontSize:'1.2rem'}}>
                  há 2 minutos
                </P>
              </Column>
              <Img src={eye}/>
            </Row>
          </LicensePlate>
      </Column>
        <Column>
          <ColumnName>Estacionado</ColumnName>
            <LicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <RightSide>
                  <Img src={eye}/>
                </RightSide>
              </Row>
            </LicensePlate>
            <LicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <RightSide>
                  <Img src={eye}/>
                </RightSide>
              </Row>
            </LicensePlate>
            <LicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <RightSide>
                  <Img src={eye}/>
                </RightSide>
              </Row>
            </LicensePlate>
            <LicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <Img src={eye}/>
              </Row>
            </LicensePlate>
            <LicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <Img src={eye}/>
              </Row>
            </LicensePlate>
        </Column>
        <Column>
          <ColumnName>Aguardando retirada</ColumnName>
            <LicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <RightSide>
                  <Img src={eye}/>
                </RightSide>
              </Row>
            </LicensePlate>
        </Column>
        <Column>
          <ColumnName>Finalizados nos últimos 10min</ColumnName>
            <DoneLicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <RightSide>
                  <Img src={eye}/>
                </RightSide>
              </Row>
            </DoneLicensePlate>
            <DoneLicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <Img src={eye}/>
              </Row>
            </DoneLicensePlate>
            <DoneLicensePlate className='car-plate'>
              <Row>
                <Column stlye={{marginRight:'0'}}>
                  <P>AAA-2A22</P>
                  <P style={{fontSize:'1.2rem'}}>
                    há 2 minutos
                  </P>
                </Column>
                <Img src={eye}/>
              </Row>
            </DoneLicensePlate>
        </Column>
    </Main>
  </Container>

}

export default App;
