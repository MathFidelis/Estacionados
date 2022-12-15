import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './main.css';
import SideBar from '../../components/SideBar/SideBarComponent';
import HomePage from '../home/Home';
import characterImg from '../../assets/images/character.png';
import Header from '../../components/Header/Header';
import History from '../history/History';
import Vallets from '../vallets/vallets';
import Metrics from '../metrics/Metrics';
import ValletQueue from '../vallet_queue/ValletQueue.jsx';
import { useEffect } from 'react';

const Main = () => {

    const [active, setActive] = useState(0);
    const changePage = (index) => {
        setActive(index);
    }

    const pages = ['Painel Administrativo', 'Manobristas', 'Ordens de serviço', 'Métricas'];
    const [ userData, setUserData ] = useState({});
    
    useEffect(()=>{
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
    }, [])
    const role = () => {
        if (userData.role == 'manager') {
            return 'Administrador da unidade'
        }
        else if (userData.role == 'valet') {
            return 'Manobrista'
        }
        return 'Atendente'
    }


    return (
        <div id="main">
            <SideBar active={active} changePage={changePage} />

            <div className="container">
                <Header name={`${userData.first_name} ${userData.last_name}`} role={role(userData.role)} img={characterImg} title={pages[active]}/>
                <Routes>
                    <Route path='/app' element={<HomePage />} />
                    <Route path='/vallets' element={<Vallets />} />
                    <Route path='/history' element={<History />} />
                    <Route path='/metrics' element={<Metrics />} />
                    <Route path='/app/queue' element={<ValletQueue />} />
                </Routes>
            </div>
        </div>
    )

}

export default Main