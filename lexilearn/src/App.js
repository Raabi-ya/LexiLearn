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
import Level1 from './Level1';

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    console.log(currentUser); // Add this line for debugging
    return currentUser ? children : <Navigate to="/LoginPage" />;
  };

  

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
          <Route path="/Level1" element={<RequireAuth><Level1 /></RequireAuth>} />
          {/*<Route path="/level2" element={<RequireAuth><Level2 /></RequireAuth>} />
          <Route path="/level3" element={<RequireAuth><Level3 /></RequireAuth>} />
        <Route path="/level4" element={<RequireAuth><Level4 /></RequireAuth>} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


