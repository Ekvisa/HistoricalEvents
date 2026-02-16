import React, { useState } from "react";
import "./App.css";
import Segment from "../Segment/Segment";
import { segments } from "../../data/segments";

import ArrowLeft from "../../interface_images/chevron-left";
import ArrowRight from "../../interface_images/chevron-right";
import Events from "../Events/Events";

const TOTAL_SEGMENTS = segments.length;

function App() {
  const [activeSegmentID, setActiveSegmentID] = useState<number>(0);

  function decreaseSegment() {
    setActiveSegmentID((prev) => (prev > 0 ? prev - 1 : prev));
  }
  function increaseSegment() {
    setActiveSegmentID((prev) => (prev < TOTAL_SEGMENTS - 1 ? prev + 1 : prev));
  }

  function pad2(n: number) {
    return n.toString().padStart(2, "0");
  }

  function drawPagination(segmentsCount: number) {
    const dots = [];
    for (let i = 0; i < segmentsCount; i++) {
      dots.push(
        <button
          key={i}
          className={`dot ${i === activeSegmentID ? "active" : ""}`}
          onClick={() => setActiveSegmentID(i)}
          aria-label={`Сегмент ${i + 1}`}
        />,
      );
    }
    return <div className="pagination">{dots}</div>;
  }

  return (
    <div className="App">
      <h1>
        Исторические
        <br />
        даты
      </h1>

      <Segment segment={segments[activeSegmentID]} />
      <div className="segmentsNavigation">
        <p className="segmentNumber">
          {pad2(activeSegmentID + 1)}/{pad2(TOTAL_SEGMENTS)}
        </p>
        <button
          id="prevSegment"
          className="switchSegment roundButton"
          onClick={decreaseSegment}
        >
          <ArrowLeft />
        </button>
        <button
          id="nextSegment"
          className="switchSegment roundButton"
          onClick={increaseSegment}
        >
          <ArrowRight />
        </button>
      </div>
      <Events
        start={segments[activeSegmentID].start}
        end={segments[activeSegmentID].end}
        label={segments[activeSegmentID].label}
      />
      {drawPagination(TOTAL_SEGMENTS)}
    </div>
  );
}

export default App;
