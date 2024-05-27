// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SuccessPage from './components/Profile_menu';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import Edit_form from './components/Edit_form';
import Stat_page from './components/Stat_page';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="App-content">
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/success' element={<SuccessPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/edit_profile' element={<Edit_form />} />
            <Route path='/statistics' element={<Stat_page />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
