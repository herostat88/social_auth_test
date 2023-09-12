import * as CONFIG from './config';

import "./App.css";
import Account from './pages/Account';
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = () => {
            fetch(CONFIG.API_HOST, {
                method:"POST", 
                headers: {
                    Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) return response.json();
                throw new Error("Authentication has been failed!");
            })
            .then((resObject) => {
                console.log(resObject);
                setUser(resObject);
            })
            .catch((err) => {
                console.log(err);
            });
        };

        getUser();

    }, []);
    
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/account" /> : <Login/>} />
                    <Route path="/account" element={user ? <Account/> : <Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
    
};

export default App;
