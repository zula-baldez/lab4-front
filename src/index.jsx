import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import './styles/style.css'
import TablePage from "./pages/TablePage";

export const BASE_URL = 'http://localhost:31500'


const root = ReactDOM.createRoot(
    document.getElementById('root')
);



root.render(
    <React.StrictMode>
            <Header/>
            <Router>
                <Routes>
                    <Route path='/login' element={< LoginPage/>}/>
                    <Route path='/register' element={< RegisterPage/>}/>
                    <Route path='/table' element={<TablePage/>}/>
                    <Route path='/' element={<LoginPage/>}/>

                </Routes>
            </Router>
    </React.StrictMode>
);

