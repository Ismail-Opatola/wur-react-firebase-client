import React from "react";
import { Spring } from "react-spring/renderprops";
import "./progressBar.css";

const horizontalProgress = ({ percentage }) => {
  if (percentage === "no votes yet") {
    return (
      <div
        className="progress horizontal"
        style={{ textAlign: `center`, fontWeight: "bold", padding: "0.1em" }}
      >
        <span className="sr-only">{`${percentage}`}</span>
      </div>
    );
  }

  let progress = Number(percentage.split("%")[0]);
  return (
    <Spring
      from={{ percent: 0, number: +1 }}
      to={{ percent: progress, number: progress }}
    >
      {({ percent, number }) => (
        <div className="progress horizontal">
          <div style={{ width: `${percent}%` }} className="progress-bar">
            <span className="sr-only">{`${Math.round(number)}%`}</span>
          </div>
        </div>
      )}
    </Spring>
  );
};

export default horizontalProgress;
