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
      result: ""
    };
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleComputerLogic = this.handleComputerLogic.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  playGame() {}

  handleUserClick(iconName) {
    let { userClicked } = this.state;
    if (userClicked) {
      return;
    }
    this.setState({ userChosenItem: iconName, userClicked: true }, () =>
      console.log("state: ", this.state)
    );

    let computerChosenItem = this.handleComputerLogic();
    this.calculateResult(iconName, computerChosenItem);
    // setTimeout(() => {
    //   this.setState({ userChosenItem: "" }); // TODO: fix a memory leak
    // }, 2000);
  }

  handleComputerLogic() {
    const iconNames = ICONS_ARRAY;
    const randomItem = _.sample(iconNames);
    this.setState({ computerChosenItem: randomItem }, () =>
      console.log("state: ", this.state)
    );
    return randomItem;
    //this.setState({ userClicked: false });
  }

  nextRound() {
    this.setState({
      userChosenItem: "",
      computerChosenItem: "",
      userClicked: false,
      result: ""
    });
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

  render() {
    let {
      userChosenItem,
      computerChosenItem,
      userClicked,
      result
    } = this.state;
    const iconNames = ICONS_ARRAY;
    let userChoiceItems = _.map(iconNames, (iconName, index) => {
      if (userChosenItem === "" || userChosenItem === iconName) {
        return (
          <div
            className="col s4"
            key={index}
            onClick={() => this.handleUserClick(iconName)}
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
        </div>
      </section>
    );
  }
}

export default Game;
