import React from "react";
// import { segments } from "../../data/segments";

import "./Circle.css";
import Segment from "../Segment/Segment";

type CircleProps = {
  segmentsOnCircle: Segment[];
  activeSegmentID: number;
};

function Circle({ segmentsOnCircle, activeSegmentID }: CircleProps) {
  console.log(`activeSegmentID = ${activeSegmentID}`);
  const segment = 360 / segmentsOnCircle.length; //one circle segment, measured in deg
  let segmentSwitchers = [];

  //Creating switchers on the circle:
  for (let i = 0; i < segmentsOnCircle.length; i++) {
    segmentSwitchers.push(
      <div
        key={segmentsOnCircle[i].id}
        className={`segmentSwitcher ${i === activeSegmentID && "active"}`}
        style={{
          //circle radius = 265px, therefore:
          transform: `rotate(${segment * (i - 1)}deg) translate(265px)`, //rotate and shift every switcher, startng from (-segment)deg
        }}
      >
        <div
          className="switcherNumber"
          style={{
            transform: `rotate(${segment - segment * (i - activeSegmentID)}deg)`, //normalize the text position
          }}
        >
          {i + 1}
          <span className="segmentLabel">{segmentsOnCircle[i].label}</span>
        </div>
      </div>,
    );
  }

  return (
    <div
      className="circle"
      style={{
        transform: `rotate(${(-360 / segmentsOnCircle.length) * activeSegmentID}deg)`,
      }}
    >
      {segmentSwitchers}
    </div>
  );
}

export default Circle;
