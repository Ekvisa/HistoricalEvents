import React, { useRef } from "react";
import { events } from "../../data/events";

import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import ArrowLeft from "../../interface_images/chevron-left";
import ArrowRight from "../../interface_images/chevron-right";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Events.css";

export function getEventsForSegment(
  segmentStart: number,
  segmentEnd: number,
  segmentLabel: string,
) {
  return events
    .filter((e) => e.year >= segmentStart && e.year <= segmentEnd)
    .filter((e) => e.label === segmentLabel)
    .sort((a, b) => a.year - b.year);
}

type eventsProps = {
  start: number;
  end: number;
  label: string;
};

function Events({ start, end, label }: eventsProps) {
  const eventsForSegment = getEventsForSegment(start, end, label);
  if (eventsForSegment.length === 0) {
    return <p>Нет событий</p>;
  }
  return (
    <div>
      <div className="eventsSlider">
        <button id="prevEvent" className="switchEvent roundButton">
          <ArrowLeft />
        </button>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: "#prevEvent",
            nextEl: "#nextEvent",
          }}
          spaceBetween={20}
          slidesPerView={4}
        >
          {eventsForSegment.map((e) => (
            <SwiperSlide>
              <p>{e.year}</p>
              <p>{e.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        <button id="nextEvent" className="switchEvent roundButton">
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Events;
