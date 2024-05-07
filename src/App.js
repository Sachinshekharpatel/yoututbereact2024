import React from 'react';
import './App.css';
import SignupPage from './signupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage/homepage';
import LoginPage from './loginpage/loginpage';
import Navbar from './Homepage/navbar';
//Youtube api key 'AIzaSyCmPDIvI1U_KaOkhylVk4bTIStAmwquxwk'
function App() {
  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/loginpage" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;
