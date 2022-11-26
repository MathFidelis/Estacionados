import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './main.css';
import SideBar from '../../components/SideBar/SideBarComponent';
import HomePage from '../home/Home';
import characterImg from '../../assets/images/character.png'
import Header from '../../components/Header/Header';
import History from '../history/History'
import Vallets from '../vallets/vallets';
import Metrics from '../metrics/Metrics';

const Main = () => {
    const [active, setActive] = useState(0);

    const changePage = (index) => {
        setActive(index)
    }

    const pages = ['Painel Administrativo', 'Manobristas', 'Histórico', 'Métricas'];

    return (
        <div id="main">
            <SideBar active={active} changePage={changePage} />

            <div className="container">
                <Header name='Marcos Lima' role='Administrador da unidade' img={characterImg} title={pages[active]}/>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/vallets' element={<Vallets />}></Route>
                    <Route path='/history' element={<History />}></Route>
                    <Route path='/metrics' element={<Metrics />}></Route>

                </Routes>
            </div>
        </div>
    )
}

export default Main