import React, { Component } from "react";
import PropTypes from "prop-types";
import ICONS from "../constants";
import IconSVG from "./IconSVG";

class Game extends Component {
  constructor(props) {
    super(props);
    //this.state = { renderComponent: false };
    //this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <section className="game-section">
        <div>
          <div className="row">
            <div className="col s5">
              <h4 className="col s12 userName">You</h4>
              <div className="choice-icons">
                <IconSVG name="rock" />
                <IconSVG name="paper" />
                <IconSVG name="scissors" />
              </div>
            </div>
            <div className="col s2">
              <h5 className="col s12">You win/lost</h5>
            </div>
            <div className="col s5">
              <h4 className="col s12 userName">Computer</h4>
              <div className="choice-icons">
                <IconSVG name="rock" />
                <IconSVG name="paper" />
                <IconSVG name="scissors" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Game;
