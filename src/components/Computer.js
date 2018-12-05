import React from "react";
import { ICONS_ARRAY } from "../constants";
import IconSVG from "./IconSVG";
import _ from "lodash";

function Computer({ computerChosenItem }) {
  const iconNames = ICONS_ARRAY;

  let computerChoiceItems = _.map(iconNames, (iconName, index) => {
    if (computerChosenItem === "" || computerChosenItem === iconName) {
      return (
        <div className="col s12 m4" key={index}>
          <IconSVG name={iconName} />
        </div>
      );
    } else {
      return <div className="col s12 m4" key={index} />;
    }
  });
  return (
    <div className="col s5">
      <h4 className="col s12 computer-name">Computer</h4>
      <div className="choice-icons">{computerChoiceItems}</div>
    </div>
  );
}

export default Computer;
