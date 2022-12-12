import React from 'react';
import character from '../../assets/images/vallet-ranking.png'
import styled from 'styled-components';
import './Metrics.css';
import { useEffect } from 'react';

const Container = styled.div`
display: flex;
`

const Column = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`

const Row = styled.div`
display:flex;
margin-top: 2rem;
`

function MetricPanel(props) {


    
const Panel = styled.div`
display: flex;
flex-direction: column;
height: 10rem;
width: 22.5rem;
margin-top: 2rem;
background-color: #F7F7F7;
padding: 2rem;
border-radius: 12px;
`

const Minute = styled.p`
font-size: 3rem;
font-weight: 700;
`

const Second = styled.p`
font-size: 1.4rem;
padding-top: 1rem;
`

const Best = styled.div`
`

return <>
    <Panel>
        <Minute>{props.min}</Minute>
        <Second>minutos e {props.sec} segundos</Second>
    </Panel>
</>
}

function RankingPlace(props) {

    
    const Place = styled.p`
    height:2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.3rem;
    background-color: #F2F2F2;
    border-radius: 100%;
    color: #818180;
    `
    const Element = styled.div`
    display: flex;
    align-items: center;
    height: 30%;
    margin-top: 0.8rem;
    width: 100%;
    `
    const ValletImage = styled.img`
    border-radius: 100%;
    margin-left: 1.2rem;
    height: 4.3rem;
    `
    const ValletName = styled.p`
    font-size: 1.3rem;
    font-weight: 500;
    color: #444442;
    `
    const ValletTime = styled(ValletName)`
    color: #818180;
    `

    const PBestWorse = styled.p`
    font-weight: 700;
    font-size: 1.5rem;
    `

    return (
        <Element>
            <Place>{props.place}</Place>
            <ValletImage src={character} />
            <Column style={{marginLeft: '1.3rem'}}>
                <ValletName>{props.name}</ValletName>
                <ValletTime>{props.time}</ValletTime>
            </Column>
        </Element>
    )

}


function App() {

    const Ranking = styled.div`
    padding-top: 3rem;
    `

    const P = styled.p`
    font-size: 1.5rem;
    `

    const PBold = styled(P)`
    font-weight: 700;
    margin-right: 0.5rem;
    `

    useEffect(()=>{

        let token = sessionStorage.getItem('token');
        const requestSettings = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    
        fetch('http://api.estapar.code.br.com:1337/api/v1/order-of-service?status=accepted', requestSettings)
        .then(response => {
            return response.json()
        })
        .catch(error => {
    
            console.log(error);
    
        }).then(data => setHistoryList(data.success.data))
        .catch(error => {
            console.error("Error fetching data: ", error)
        })
    }, [])
    

    return <Container>
        <Column>
            <Row style={{padding:'3rem 0 0 4rem', fontSize:'1.5rem', marginTop:'3rem'}}>
                <Column>
                    <P><b>Tempo</b> médio para aceitar</P><P>uma ordem de serviço</P>
                    <MetricPanel min='2' sec='20'/>
                    <Ranking>
                        <Row style={{paddingBottom:'1rem'}}>
                            <PBold>Acima</PBold>
                            <P>da média</P>
                        </Row>
                    </Ranking>
                    <RankingPlace place='1' name='Marcos Silva' time='1 minuto e 10 segundos'/>
                        <Row style={{paddingTop:'2rem'}}>
                            <PBold>Abaixo</PBold>
                            <P>da média</P>
                        </Row>
                    <RankingPlace place='1' name='Marcos Silva' time='2 minutos e 25 segundos'/>
                </Column>
                <Column>
                    <P><b>Tempo</b> médio para</P><P>estacionar o veículo</P>
                    <MetricPanel min='5' sec='27'/>
                    <Ranking>
                        <Row style={{paddingBottom:'1rem'}}>
                            <PBold>Acima</PBold>
                            <P>da média</P>
                        </Row>
                    </Ranking>
                    <RankingPlace place='1' name='Marcos Silva' time='1 minuto e 5 segundos'/>
                        <Row style={{paddingTop:'2rem'}}>
                            <PBold>Abaixo</PBold>
                            <P>da média</P>
                        </Row>
                    <RankingPlace place='1' name='Marcos Silva' time='2 minutos e 55 segundos'/>
                </Column>
                <Column>
                    <P><b>Tempo</b> médio para buscar</P><P>um veículo</P>
                    <MetricPanel min='4' sec='49'/>
                    <Ranking>
                        <Row style={{paddingBottom:'1rem'}}>
                            <PBold>Acima</PBold>
                            <P>da média</P>
                        </Row>
                    </Ranking>
                    <RankingPlace place='1' name='Marcos Silva' time='1 minuto e 10 segundos'/>
                        <Row style={{paddingTop:'2rem'}}>
                            <PBold>Abaixo</PBold>
                            <P>da média</P>
                        </Row>
                    <RankingPlace place='1' name='Marcos Silva' time='2 minutos e 25 segundos'/>
                </Column>
            </Row>
        </Column>

    </Container>

}

export default App;