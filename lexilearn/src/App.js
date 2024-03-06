import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Use Routes instead of Switch
import Home from './Home';
import AboutUsPage from './AboutUsPage';
import UserForm from './UserForm';
import LoginPage from './LoginPage';
import Navbar from './NavBar';
import SelectLevelsPage from './SelectLevelsPage';
import Signup from './Signup';
import { AuthContext } from "./context/AuthContext";

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/LoginPage" />;
  };

  console.log(currentUser)

  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUspage" element={
            <RequireAuth>
              <AboutUsPage />
            </RequireAuth>
          } />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/UserForm" element={
            <RequireAuth>
              <UserForm />
            </RequireAuth>
          } />
          <Route path="/SelectLevelsPage" element={
            <RequireAuth>
              <SelectLevelsPage />
            </RequireAuth>
          } />
          <Route path="/Signup" element={<Signup />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


