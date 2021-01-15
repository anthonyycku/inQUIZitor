class App extends React.Component {
  state = {
    points: 5,
  }
  playAgain = () => {
    this.setState({ points: 0 })
  }
  render() {
    const { points } = this.state;

    if (points < 4) {
      return <Game />
    } else {
      return <Winner playAgain={this.playAgain} />
    }
  } //End of render
}//End of class


