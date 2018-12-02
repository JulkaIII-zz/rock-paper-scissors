import React, { Component } from "react";
import logo from "./icons/logo.svg";
import Game from "./components/Game";
import "./App.scss";
import "materialize-css/dist/css/materialize.min.css";

class App extends Component {
  constructor() {
    super();
    this.state = { renderComponent: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("APP event");
    this.setState({ renderComponent: !this.state.renderComponent });
  }

  render() {
    const { renderComponent } = this.state;
    return (
      <div className="App">
        <header className="app-header">
          <h1>Rock Paper Scissors</h1>
        </header>
        <main>
          {renderComponent ? (
            <Game />
          ) : (
            <img src={logo} className="app-logo" alt="logo" />
          )}
        </main>
        <footer>
          <div className="play-button" onClick={this.handleClick}>
            {renderComponent ? (
              <a className="waves-effect waves-light btn-large">
                <i className="material-icons right">exit_to_app</i>quit
              </a>
            ) : (
              <a className="waves-effect waves-light btn-large">
                <i className="material-icons right">play_arrow</i>play
              </a>
            )}
          </div>
          <span>2018 &copy;</span>
        </footer>
      </div>
    );
  }
}

export default App;
