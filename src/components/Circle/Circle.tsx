import React, { useState } from "react";

import "./Circle.css";

import Years from "../Years/Years";
import { segments } from "../../data/segments";
import { Segment } from "../../types/timeline";

type CircleProps = {
  segmentsOnCircle: Segment[];
  activeSegment: Segment;
  prevSegment: Segment; //to calculate the shortest rotation
  onSegmentClick: (segment: Segment) => void;
  rotation: number;
};

function Circle({
  segmentsOnCircle,
  activeSegment,
  prevSegment,
  onSegmentClick,
  rotation,
}: CircleProps) {
  const segmentDeg = 360 / segmentsOnCircle.length;

  let prevAngle = -segmentDeg * prevSegment.id;

  console.log(`prevAngle = ${prevAngle}`);
  let activeAngle = -segmentDeg * activeSegment.id;

  console.log(`activeAngle = ${activeAngle}`);

  let delta = activeAngle - prevAngle;
  console.log(`delta = ${delta}`);

  //кратчайший путь
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  console.log(`кратчайший путь = ${delta}`);

  let calculatedRotation = prevAngle + delta;
  console.log(`prevAngle + delta = ${calculatedRotation}`);

  let segmentSwitchers = [];

  //Creating switchers on the circle:
  for (let i = 0; i < segmentsOnCircle.length; i++) {
    segmentSwitchers.push(
      <div
        key={segmentsOnCircle[i].id}
        onClick={() => onSegmentClick(segmentsOnCircle[i])} //dont delete
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
    <div className="underlay">
      <div
        className="circle"
        style={{
          // transform: `rotate(${-segmentDeg * activeSegment.id}deg)`,
          // transform: `rotate(${calculatedRotation}deg)`,
          transform: `rotate(${rotation}deg)`, //new
        }}
      >
        {segmentSwitchers}
      </div>
      <Years start={activeSegment.start} end={activeSegment.end} />
    </div>
  );
}

export default Circle;
