import React, { Component } from "react";
import PropTypes from "prop-types";
import { ICONS_ARRAY, RULES } from "../constants";
import IconSVG from "./IconSVG";
import _ from "lodash";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      userChosenItem: "",
      computerChosenItem: "",
      userClicked: false,
      result: "",
      round: 1
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
    // const { userChosenItem, computerChosenItem } = this.state;
    if (userChosenItem === computerChosenItem) {
      this.setState({ result: "Draw" });
      return;
    } else if (RULES[userChosenItem] === computerChosenItem) {
      this.setState({ result: "You win" });
      return;
    }
    return this.setState({ result: "You lost" });
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
      round: 1
    });
  }

  render() {
    let {
      userChosenItem,
      computerChosenItem,
      userClicked,
      result,
      round
    } = this.state;
    const iconNames = ICONS_ARRAY;
    let userChoiceItems = _.map(iconNames, (iconName, index) => {
      if (userChosenItem === "" || userChosenItem === iconName) {
        return (
          <div
            className="col s4"
            key={index}
            onClick={() => this.playGame(iconName)}
          >
            <IconSVG name={iconName} />
          </div>
        );
      } else {
        return <div className="col s4" key={index} />;
      }
    });

    let computerChoiceItems = _.map(iconNames, (iconName, index) => {
      if (computerChosenItem === "" || computerChosenItem === iconName) {
        return (
          <div className="col s4" key={index}>
            <IconSVG name={iconName} />
          </div>
        );
      } else {
        return <div className="col s4" key={index} />;
      }
    });

    return (
      <section className="game-section">
        <div>
          <div className="row">
            <div className="col s5 icons-block">
              <h4 className="col s12 userName">You</h4>
              <div className="choice-icons">{userChoiceItems}</div>
            </div>
            <div className="col s2">
              <h5 className="col s12">Round {round}</h5>
              <h5 className="col s12">{result}</h5>
            </div>
            <div className="col s5">
              <h4 className="col s12 userName">Computer</h4>
              <div className="choice-icons">{computerChoiceItems}</div>
            </div>
          </div>
          {userClicked && (
            <a
              className="waves-effect waves-light btn-small"
              onClick={this.nextRound}
            >
              <i className="material-icons right">cloud</i>Next Round
            </a>
          )}
          {(round > 1 || userClicked) && (
            <a
              className="waves-effect waves-light btn-small"
              onClick={this.restartGame}
            >
              <i className="material-icons right">cloud</i>Restart game
            </a>
          )}
        </div>
      </section>
    );
  }
}

export default Game;
