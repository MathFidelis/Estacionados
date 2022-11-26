import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/main/Main';
import HomePage from '../pages/home/Home';
import Queue from '../pages/queue/Queue.jsx';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<HomePage />}></Route>
                <Route path='/queue' element={<Queue />}></Route>
                <Route path='/*' element={<Main />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router