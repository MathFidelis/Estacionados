import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/estapar-logo.svg';
import '../../components/Global.css';
import './SideBar.css';
import HomeImg from '../../assets/images/home.svg';
import History from '../../assets/images/history.svg';
import Vallets from '../../assets/images/vallets.svg';
import Metrics from '../../assets/images/metrics.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const items = [
    {
        img: HomeImg,
        pageName: 'Página Inicial',
        url: '/'
    },
    {
        img: Vallets,
        pageName: 'Manobristas',
        url: '/vallets',
    },
    {
        img: History,
        pageName: 'Histórico',
        url: '/history'
    },
    {
        img: Metrics,
        pageName: 'Métricas',
        url: '/metrics'
    }
]

function SideBar(props) {

    return (
        <div id='sidebar' className='container'>
            <div className='sidebar'>
                <div className='logo-div'>
                    <img src={logo} />
                </div>
                {
                    items.map((item, index) => {
                        return (
                            <Link onClick={() => props.changePage(index)} className='menu' to={item.url}>
                                <div className={`menu-item ${props.active === index && 'active'}`} >
                                    <img className='item-image' src={item.img} alt={item.pageName} />
                                    <p className='item-name'>{item.pageName}</p> 
                                </div>
                                <div className={`active-bar ${props.active === index && 'active'}`} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default SideBar;