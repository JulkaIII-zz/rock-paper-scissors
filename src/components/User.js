import React from "react";
import { ICONS_ARRAY } from "../constants";
import IconSVG from "./IconSVG";
import _ from "lodash";

function User({ userChosenItem, playGame }) {
  const iconNames = ICONS_ARRAY;

  const userChoiceItems = _.map(iconNames, (iconName, index) => {
    if (userChosenItem === "" || userChosenItem === iconName) {
      return (
        <div
          className="col s12 m4"
          key={index}
          onClick={() => playGame(iconName)}
        >
          <IconSVG name={iconName} />
        </div>
      );
    } else {
      return <div className="col s12 m4" key={index} />;
    }
  });
  return (
    <div className="col s5 icons-block">
      <h4 className="col s12 user-name">You</h4>
      <div className="choice-icons">{userChoiceItems}</div>
    </div>
  );
}

export default User;
