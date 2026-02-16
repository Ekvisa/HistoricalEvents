import React, { useState } from "react";
import "./Segment.css";
import Events from "../Events/Events";
import { segments } from "../../data/segments";
import Years from "../Years/Years";
import { Segment } from "../../types/timeline";
import Circle from "../Circle/Circle";

type SegmentProps = {
  segment: Segment;
};

function Segment({ segment }: SegmentProps) {
  if (!segment) return null;
  return (
    <div className="segment">
      <Years start={segment.start} end={segment.end} />
      <Circle segmentsOnCircle={segments} activeSegmentID={segment.id} />
    </div>
  );
}

export default Segment;
