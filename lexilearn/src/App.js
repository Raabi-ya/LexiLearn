import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Home from './Home';
import AboutUsPage from './AboutUsPage';
import UserForm from './UserForm';
import LoginPage from './LoginPage';
import Navbar from './NavBar';
import SelectLevelsPage from './SelectLevelsPage';
import Signup from './Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUspage" element={<AboutUsPage />} />
          <Route path="/UserForm" element={<UserForm />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SelectLevelsPage" element={<SelectLevelsPage />} />
          <Route path="/Signup" element={<Signup />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


