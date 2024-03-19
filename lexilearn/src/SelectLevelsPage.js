import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './SelectLevelsPage.css';
import Footer from './Footer';

function SelectLevelsPage() {
  const [backgroundImage] = useState([
    './classroompath.jpg',
    '/bookpath.png',
    '/roadpath.jpg',
    './beachpath.jpg',
    './forestpath.jpg',
    './bridgepath.jpg',
    './candypath.jpg',
    './frozenpath.jpg',
    './animalspath.jpg',
    './carspath.jpg', 
    './playgroundpath.jpg',
    './dogspath.jpg',
    './bearspath.jpg',
    './castlepath.jpg',
    './baymaxpath.jpg',
    './footballpath.jpeg',
    './cricketpath.jpg',
    'flintstonespath.png',
    'princesspath.jpg',
    './ralphpath.jpg',
    './garfieldpath.jpg',
    './animebridgepath.jpg'] );
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const handleBackgroundChange = () => {
    setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImage.length);
    
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage[currentBackgroundIndex]})`, // Path to the current background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    /* Add any other styles you need */
  };


  return (
      <div style={backgroundStyle}>
      <div className="Selected-Levels-Page">
        <header className="Selected-Levels-Page-header">
          <div className="content">
          <audio src={`${process.env.PUBLIC_URL}/select-level-background-track.mp3`} autoPlay loop />
            <div className="Level-button">
              <h1>Levels</h1>
              <p>Select Level to Play :</p>
              <div className="button-shadow">
                
                <Link to="/PlacementTest"><button className="image1-buttons"><img src="/lp.gif" alt="Pre Test" /></button></Link>
                <Link to="/Level1"><button className="image-buttons"><img src="/l1.gif" alt="Level 1" /></button></Link>
                <Link to="/level2"><button className="image-buttons"><img src="/l2.gif" alt="Level 2" /></button></Link>
                <Link to="/Level3"> <button className="image4-buttons"><img src="/l3.gif" alt="Level 3" /></button></Link>
                <Link to="/Level4"><button className='image4-buttons'><img src="/l4.gif" alt="Level 4"/></button></Link>
                
                <button className="background-button" onClick={handleBackgroundChange}>Change Background</button>
            </div>
            </div>
            
          </div>
        </header>
      </div>
      <Footer />
    </div>
  );
}


export default SelectLevelsPage;
