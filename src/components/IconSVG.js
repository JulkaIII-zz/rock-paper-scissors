import React from "react";
import PropTypes from "prop-types";
import ICONS from "./../constants";

const svgSources = {};
svgSources.rock = ICONS.ROCK;
svgSources.paper = ICONS.PAPER;
svgSources.scissors = ICONS.SCISSORS;

const IconSVG = ({ name }) => {
  if (name) {
    return svgSources[name] ? (
      <span
        className={`icon svg-icon-${name}`}
        dangerouslySetInnerHTML={{ __html: svgSources[name] }}
      />
    ) : (
      <span className={`icon icon-${name}`} />
    );
  }
  return null;
};

IconSVG.defaultProps = {
  name: ""
};

IconSVG.propTypes = {
  name: PropTypes.string.isRequired
};

export default IconSVG;
