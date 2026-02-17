import React, { useState } from "react";
import "./Segment.css";
import Events from "../Events/Events";
import { segments } from "../../data/segments";
import Years from "../Years/Years";
import { Segment } from "../../types/timeline";
import Circle from "../Circle/Circle";

type SegmentProps = {
  segment: Segment;
  onSegmentClick: (segment: Segment) => void;
  rotation: number;
};

function Segment({ segment, onSegmentClick, rotation }: SegmentProps) {
  if (!segment) return null;
  return (
    <div className="segment">
      <Circle
        segmentsOnCircle={segments}
        activeSegment={segment}
        prevSegment={segment}
        onSegmentClick={onSegmentClick}
        rotation={rotation}
      />
      <Years start={segment.start} end={segment.end} />
    </div>
  );
}

export default Segment;
