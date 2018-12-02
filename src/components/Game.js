import React, { Component } from "react";
import PropTypes from "prop-types";
import { ICONS_ARRAY } from "../constants";
import IconSVG from "./IconSVG";
import _ from "lodash";

class Game extends Component {
  constructor() {
    super();
    this.state = { chosenItem: "" };
    this.makeChoice = this.makeChoice.bind(this);
  }

  makeChoice(name) {
    this.setState({ chosenItem: name });

    setTimeout(() => {
      this.setState({ chosenItem: "" }); // TODO: fix a memory leak
    }, 2000);
  }

  render() {
    let { chosenItem } = this.state;
    let iconNames = ICONS_ARRAY;
    let choiceItems = _.map(iconNames, (iconName, index) => {
      if (chosenItem === "" || chosenItem === iconName) {
        return (
          <div
            className="col s4"
            key={index}
            onClick={() => this.makeChoice(iconName)}
          >
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
              <div className="choice-icons">{choiceItems}</div>
            </div>
            <div className="col s2">
              <h5 className="col s12" onClick={this.makeChoice}>
                You win/lost
              </h5>
            </div>
            <div className="col s5">
              <h4 className="col s12 userName">Computer</h4>
              <div className="choice-icons">{choiceItems}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Game;
