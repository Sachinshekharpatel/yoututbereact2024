import React from 'react';
import './App.css';
import SignupPage from './signupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Homepage/homepage';
import LoginPage from './loginpage/loginpage';
import Navbar from './Homepage/navbar';
import WatchVideo from './watchvideopage/watchVideo';
//Youtube api key 'AIzaSyCIfHsLh1_aQLeZMZkZTcgX4NqyPeHePv8'
// github : https://github.com/Sachinshekharpatel/yoututbereact2024
function App() {
  return (
    <Router>
    <div className="App">    
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/loginpage" element={<LoginPage/>} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/watchVideoPage" element={<WatchVideo />} />
      </Routes>
    </div>
  </Router>

  );
}

export default App;
