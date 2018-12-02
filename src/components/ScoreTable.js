import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

function ScoreTable({ scores }) {
  return (
    <div className="row score-table">
      <table className="centered col s6">
        <thead>
          <tr>
            <th>Your scores</th>
            <th>Computer Scores</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {_.map(scores, (score, index) => (
              <td key={index}>{score}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ScoreTable;
