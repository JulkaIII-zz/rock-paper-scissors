import React, { Component } from "react";
import { ICONS_ARRAY, RULES } from "../constants";
import IconSVG from "./IconSVG";
import ScoreTable from "./ScoreTable";
import _ from "lodash";
import User from "./User";
import Computer from "./Computer";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      userChosenItem: "",
      computerChosenItem: "",
      userClicked: false,
      result: "",
      round: 1,
      userScore: 0,
      computerScore: 0
    };
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleComputerLogic = this.handleComputerLogic.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.playGame = this.playGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  playGame(userChosenItem) {
    let { userClicked } = this.state;
    if (userClicked) {
      return;
    }
    this.handleUserClick(userChosenItem);
    let computerChosenItem = this.handleComputerLogic();
    this.calculateResult(userChosenItem, computerChosenItem);
  }

  handleUserClick(userChosenItem) {
    this.setState({ userChosenItem: userChosenItem, userClicked: true });
  }

  handleComputerLogic() {
    const iconNames = ICONS_ARRAY;
    const randomItem = _.sample(iconNames);
    this.setState({ computerChosenItem: randomItem });
    return randomItem;
  }

  calculateResult(userChosenItem, computerChosenItem) {
    if (userChosenItem === computerChosenItem) {
      this.setState({ result: "Draw" });
      return;
    } else if (RULES[userChosenItem] === computerChosenItem) {
      this.setState({ result: "You win", userScore: this.state.userScore + 1 });
      return;
    }
    return this.setState({
      result: "You lost",
      computerScore: this.state.computerScore + 1
    });
  }

  nextRound() {
    this.setState({
      userChosenItem: "",
      computerChosenItem: "",
      userClicked: false,
      result: "",
      round: this.state.round + 1
    });
  }

  restartGame() {
    this.setState({
      userChosenItem: "",
      computerChosenItem: "",
      userClicked: false,
      result: "",
      round: 1,
      userScore: 0,
      computerScore: 0
    });
  }

  render() {
    let { userClicked, result, round, userScore, computerScore } = this.state;
    const scores = [userScore, computerScore];

    return (
      <section className="game-section">
        <div>
          <div className="row">
            <User {...this.state} playGame={this.playGame} />
            <div className="col s2">
              <h5 className="col s12 teal accent-2 round">Round {round}</h5>
              <h4 className="col s12 game-result">{result}</h4>
            </div>
            <Computer {...this.state} />
          </div>
          <div className="game-button">
            {userClicked && (
              <a
                className="waves-effect waves-light btn-small next-round-btn"
                onClick={this.nextRound}
              >
                <i className="material-icons right">navigate_next</i>Next Round
              </a>
            )}
          </div>
          <ScoreTable scores={scores} />
          <div className="game-button">
            {(round > 1 || userClicked) && (
              <a
                className="waves-effect waves-light btn-small restart-btn"
                onClick={this.restartGame}
              >
                <i className="material-icons right">replay</i>Restart game
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Game;
