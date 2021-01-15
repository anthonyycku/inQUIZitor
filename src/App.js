import './App.css';
import React from 'react';

//COMPONENTS
import Winner from "./components/winner"
import Game from "./components/game"

class App extends React.Component {
  state = {
    points: 0,
  }

  render() {
    const { points } = this.state;

    if (points < 4) {
      return <Game />
    } else {
      return <Winner />
    }
  } //End of render
}//End of class

export default App;
