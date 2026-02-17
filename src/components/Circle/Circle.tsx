import React, { useState } from "react";

import "./Circle.css";

import Years from "../Years/Years";

import { Segment } from "../../types/timeline";

type CircleProps = {
  segmentsOnCircle: Segment[];
  activeSegment: Segment;
  onSegmentClick: (segment: Segment) => void;
  rotation: number;
};

function Circle({
  segmentsOnCircle,
  activeSegment,
  onSegmentClick,
  rotation,
}: CircleProps) {
  const segmentDeg = 360 / segmentsOnCircle.length;

  let segmentSwitchers = [];

  //Creating switchers on the circle:
  for (let i = 0; i < segmentsOnCircle.length; i++) {
    segmentSwitchers.push(
      <div
        key={segmentsOnCircle[i].id}
        onClick={() => onSegmentClick(segmentsOnCircle[i])}
        className={`segmentSwitcher ${i === activeSegment.id && "active"}`}
        style={{
          //circle radius = 265px, therefore:
          transform: `rotate(${segmentDeg * (i - 1)}deg) translate(265px)`, //rotate and shift every switcher, startng from (-segment)deg
        }}
      >
        <div
          className="switcherNumber"
          style={{
            transform: `rotate(${segmentDeg - segmentDeg * (i - activeSegment.id)}deg)`, //normalize the text position
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
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {segmentSwitchers}
    </div>
    // <Years start={activeSegment.start} end={activeSegment.end} />
  );
}

export default Circle;
