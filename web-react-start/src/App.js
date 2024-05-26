import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './App.css'; // якщо ви використовуєте CSS
import LoginForm from "./components/LoginForm.jsx"; 
import HomePage from "./components/HomePage.jsx"; 
import AboutPage from "./components/AboutPage.jsx"; 
import SuccessPage from './components/Profile_menu.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path='/' exact element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/success' element={<SuccessPage/>} />
            <Route path='/home' element={<HomePage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/profile' element={<ProfilePage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;