import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/main/Main';
import ValletQueue from '../pages/vallet_queue/ValletQueue.jsx';
import Login from '../pages/login/Login';
import AccessDenied from '../pages/access_denied/AccessDenied';
import HomePage from '../pages/home/Home';
import CustomerQueue from '../pages/customer_queue/CustomerQueue';


const Router = () => {

    useEffect(()=>{
        let role = sessionStorage.getItem('role');
        console.log(role);
    })

    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/app/queue' element={<ValletQueue />} />
                    <Route path='/customer-queue' element={<CustomerQueue />} />
                    <Route path='denied' element={<AccessDenied />} />
                    <Route path='/*' element={<Main />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    )
}

export default Router