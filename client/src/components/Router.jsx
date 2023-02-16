import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register'

export default function Router() {
  return (
    <BrowserRouter >
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}></Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} /> 
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter >
  );
}

