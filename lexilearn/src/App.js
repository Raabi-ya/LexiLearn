import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './Home';
import AboutUsPage from './AboutUsPage';
import UserForm from './UserForm';
import LoginPage from './LoginPage';
import Navbar from './NavBar';
import SelectLevelsPage from './SelectLevelsPage';
import Signup from './Signup';
import { AuthContext } from "./context/AuthContext";
import Level1 from './Level1';
import ContactUs from './ContactUs';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import PlacementTest from './PlacementTest';
import Footer from './Footer';

function App() {

  //Function to display certain pages to the user only after logging in
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    console.log(currentUser); 
    return currentUser ? children : <Navigate to="/LoginPage" />;
  };

  return (
    //Setting router paths for pages
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
          <Route path="/ContactUs" element={<ContactUs />}/>
          <Route path="/Level3" element={<RequireAuth><Level3 /></RequireAuth>} />
          <Route path="/Level2" element={<RequireAuth><Level2 /></RequireAuth>} />
          <Route path="/Level4" element={<RequireAuth><Level4 /></RequireAuth>} />
          <Route path="/PlacementTest" element={<RequireAuth><PlacementTest /></RequireAuth>} />
        </Routes>
      </div>
      <div><Footer/></div>
      
    </Router>
  );
}

export default App;


