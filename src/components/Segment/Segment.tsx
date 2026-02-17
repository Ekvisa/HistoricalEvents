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
  prevSegment: Segment;
};

function Segment({
  segment,
  onSegmentClick,
  rotation,
  prevSegment,
}: SegmentProps) {
  if (!segment) return null;
  return (
    <div className="segment">
      <Circle
        segmentsOnCircle={segments}
        activeSegment={segment}
        onSegmentClick={onSegmentClick}
        rotation={rotation}
      />
      <Years
        start={segment.start}
        end={segment.end}
        prevStart={prevSegment.start}
        prevEnd={prevSegment.end}
      />
    </div>
  );
}

export default Segment;
