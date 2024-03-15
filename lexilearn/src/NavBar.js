import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { auth,db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import "./NavBar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const { currentUser, dispatch } = useContext(AuthContext);
  const { navigate } = useNavigate();
  const [username, setUsername] = useState("");

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      dispatch({ type: "LOGOUT" }); // Assuming you have a "LOGOUT" action in your reducer
      navigate("/login"); // Redirect to login page or any other appropriate route
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  }

  const getUser = async () => {
    const user = auth.currentUser;
    if(user){
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const userData = docSnap.data();
      setUsername(userData.username);
    } else {
     // docSnap.data() will be undefined in this case
     console.log("No such document!");
    }
    
  }
  };

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div className={`navbar ${openLinks ? "open" : "close"}`}>
      <div className="leftSide">
        <button className="toggleButton" onClick={toggleNavbar}>
          ☰
        </button>
        <img src="/lexiLearnLogo.png" alt="Logo" />
        <div className="hiddenLinks">
          <Link to="/">Home</Link>
          <Link to="/SelectLevelsPage">Levels</Link>
          <Link to="/UserForm">User Profile</Link>
          <Link to="/AboutUsPage">Progress</Link>
          {/*<Link to="/LoginPage">Sign In</Link>*/}
          {/*{currentUser ? (
          <span>Welcome, {username}</span>
          
        ) : (
          <Link to="/LoginPage">Login</Link>
        )}*/}

          {currentUser && <span>Welcome, {username}</span>}
          {currentUser && <Link to="#" onClick={handleSignOut}>Sign Out</Link>}
          {!currentUser && <Link to="/LoginPage">Login</Link>}

          {/*<Link to="/Signup">Sign Up</Link>*/}

          {/* Conditionally render Sign Up link based on the user's login status */}
          {/*{!currentUser && <Link to="/Signup">Sign Up</Link>}*/}
          {/*<Link to="#" onClick={handleSignOut}>Sign Out</Link>*/}
        </div>
      </div>
      <div className="rightSide">
        <Link to="/">Home</Link>
        <Link to="/SelectLevelsPage">Levels</Link>
        <Link to="/UserForm">User Profile</Link>
        <Link to="/AboutUsPage">Progress</Link>
        {/*<Link to="/LoginPage">Sign In</Link>*/}
        {/*{currentUser ? (
          <span>Welcome, {username}</span>
        ) : (
          <Link to="/LoginPage">Login</Link>
        )}*/}

        {currentUser && <span>Welcome, {username}</span>}
        {currentUser && <Link to="#" onClick={handleSignOut}>Sign Out</Link>}
        {!currentUser && <Link to="/LoginPage">Login</Link>}

        {/*<Link to="/Signup">Sign Up</Link>*/}

        {/* Conditionally render Sign Up link based on the user's login status */}
        {/*{!currentUser && <Link to="/Signup">Sign Up</Link>}*/}
        {/*<Link to="#" onClick={handleSignOut}>Sign Out</Link>*/}
      </div>
    </div>
  );
}

export default Navbar;
