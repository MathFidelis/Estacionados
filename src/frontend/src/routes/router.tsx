import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/main/Main';
import Queue from '../pages/queue/Queue.jsx';
import Login from '../pages/login/Login';
import HomePage from '../pages/home/Home';

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/app/queue' element={<Queue />} />
                <Route path='/*' element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router