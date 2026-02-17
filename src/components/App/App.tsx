import React, { useState } from "react";
import "./App.css";
import Segment from "../Segment/Segment";
import { segments } from "../../data/segments";
import Circle from "../Circle/Circle";
import Events from "../Events/Events";
import ArrowLeft from "../../interface_images/chevron-left";
import ArrowRight from "../../interface_images/chevron-right";

const TOTAL_SEGMENTS = segments.length;

function App() {
  const [activeSegment, setActiveSegment] = useState<Segment>(segments[0]);
  const [prevSegment, setPrevSegment] = useState<Segment>(segments[0]);

  const handleSegmentClick = (segment: Segment) => {
    if (segment.id === activeSegment.id) return;
    setPrevSegment(activeSegment);
    setActiveSegment(segment);
  };

  function decreaseSegment() {
    setActiveSegment((prevSegment) =>
      prevSegment.id > 0 ? segments[prevSegment.id - 1] : prevSegment,
    );
  }
  function increaseSegment() {
    setActiveSegment((prevSegment) =>
      prevSegment.id < TOTAL_SEGMENTS - 1
        ? segments[prevSegment.id + 1]
        : prevSegment,
    );
  }

  function pad2(n: number) {
    return n.toString().padStart(2, "0");
  }

  function drawNavigation() {
    return (
      <div className="segmentsNavigation">
        <p className="segmentNumber">
          {pad2(activeSegment.id + 1)}/{pad2(TOTAL_SEGMENTS)}
        </p>
        <button
          id="back"
          className="switchSegment roundButton"
          onClick={decreaseSegment}
        >
          <ArrowLeft />
        </button>
        <button
          id="forth"
          className="switchSegment roundButton"
          onClick={increaseSegment}
        >
          <ArrowRight />
        </button>
      </div>
    );
  }

  function drawPagination(segmentsCount: number) {
    const dots = [];
    for (let i = 0; i < segmentsCount; i++) {
      dots.push(
        <button
          key={i}
          className={`dot ${i === activeSegment.id ? "active" : ""}`}
          onClick={() => setActiveSegment(segments[i])}
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

      <Circle
        segmentsOnCircle={segments}
        activeSegment={activeSegment}
        prevSegment={prevSegment}
        onSegmentClick={handleSegmentClick}
      />

      {drawNavigation()}

      <Events
        start={activeSegment.start}
        end={activeSegment.end}
        label={activeSegment.label}
      />

      {drawPagination(TOTAL_SEGMENTS)}
    </div>
  );
}

export default App;
