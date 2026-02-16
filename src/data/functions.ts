import { events } from "./events";
import { segments } from "./segments";
import { Segment } from "../types/timeline";

export function getEventsForSegment(segment: Segment) {
  return events
    .filter((e) => e.year >= segment.start && e.year <= segment.end)
    .filter((e) => e.label === segment.label)
    .sort((a, b) => a.year - b.year);
}
