import React, { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';
import LiftGame from '../components/LiftGame';
import BoomLiftGame from '../components/BoomLiftGame'; // Import the other game
import './LiftGameScreen.css';
import lift_game_bg from '../assets/icons/pixelArt/lift_game_bg.png'

const LiftGameScreen = () => {
  const [game, setGame] = useState('lift'); // Add a state variable

  useEffect(() => {
    // Disable scrolling on the body
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const switchGame = (event) => { // Add the event parameter
    setGame(game === 'lift' ? 'boom' : 'lift');
    event.target.blur(); // Remove focus from the button
  };

  return (
    <Container style={{
      display:"flex", 
      justifyContent:'center', 
      alignItems:'center',
      backgroundImage:`url(${lift_game_bg})`, 
      backgroundRepeat:"no-repeat", 
      backgroundSize:"cover",
      backgroundPosition:"center",
      maxWidth: "100%",
      flexDirection: 'column',
      zIndex: 10,
    }}>
      <Button style={{backgroundColor:"rgba(255,255,255,0.6)",marginTop:20, width:"20%"}} onClick={switchGame}>Switch Game</Button> {/* Add a button to switch games */}
      {game === 'lift' ? <LiftGame /> : <BoomLiftGame />} {/* Display the correct game based on the state */}
    </Container>
  );
};

export default LiftGameScreen;