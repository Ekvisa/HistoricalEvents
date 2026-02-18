import React, { useState } from "react";
import "./App.scss";
import { segments } from "../../data/segments";
import Circle from "../Circle/Circle";
import Events from "../Events/Events";
import ArrowLeft from "../../interface_images/chevron-left";
import ArrowRight from "../../interface_images/chevron-right";
import { Segment } from "../../types/timeline";
import Years from "../Years/Years";

const TOTAL_SEGMENTS = segments.length;

function App() {
  const [activeSegment, setActiveSegment] = useState<Segment>(segments[0]);
  const [prevSegment, setPrevSegment] = useState<Segment>(segments[0]);

  const segmentDeg = 360 / TOTAL_SEGMENTS;

  //Transforming angle into [-180, 180] range:
  function normalizeAngle(angle: number) {
    return ((angle + 180) % 360) - 180;
  }

  //Find the shortest way:
  const computeRotation = (prev: Segment, active: Segment) => {
    const prevAngle = -prev.id * segmentDeg;
    const activeAngle = -active.id * segmentDeg;

    let delta = activeAngle - prevAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    return prevAngle + delta;
  };

  const rotation = computeRotation(prevSegment, activeSegment);

  const handleSegmentClick = (segment: Segment) => {
    if (segment.id === activeSegment.id) return;
    setPrevSegment(activeSegment);
    setActiveSegment(segment);
  };

  const decreaseSegment = () => {
    if (activeSegment.id > 0) {
      setPrevSegment(activeSegment);
      setActiveSegment(segments[activeSegment.id - 1]);
    }
  };

  const increaseSegment = () => {
    if (activeSegment.id < TOTAL_SEGMENTS - 1) {
      setPrevSegment(activeSegment);
      setActiveSegment(segments[activeSegment.id + 1]);
    }
  };

  function pad2(n: number) {
    return n.toString().padStart(2, "0");
  }

  function drawNavigation() {
    return (
      <div className="segmentsNavigation">
        <p className="segmentNumber">
          {pad2(activeSegment.id + 1)}/{pad2(TOTAL_SEGMENTS)}
        </p>
        <div className="switchSegment">
          <button
            id="back"
            className="roundButton"
            onClick={decreaseSegment}
            disabled={activeSegment.id === 0}
          >
            <ArrowLeft />
          </button>
          <button
            id="forth"
            className="roundButton"
            onClick={increaseSegment}
            disabled={activeSegment.id === TOTAL_SEGMENTS - 1}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    );
  }

  function drawPagination() {
    return (
      <div className="pagination">
        {segments.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeSegment.id ? "active" : ""}`}
            onClick={() => {
              setPrevSegment(activeSegment);
              setActiveSegment(segments[i]);
            }}
            aria-label={`Сегмент ${i + 1}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="underlay">
        <h1>
          Исторические
          <br />
          даты
        </h1>
        <Circle
          segmentsOnCircle={segments}
          activeSegment={activeSegment}
          onSegmentClick={handleSegmentClick}
          rotation={rotation}
        />
        <Years
          start={activeSegment.start}
          end={activeSegment.end}
          prevStart={prevSegment.start}
          prevEnd={prevSegment.end}
        />
      </div>
      {drawNavigation()}

      <Events
        start={activeSegment.start}
        end={activeSegment.end}
        label={activeSegment.label}
      />

      {drawPagination()}
    </div>
  );
}

export default App;
