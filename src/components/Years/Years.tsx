import { useEffect, useState } from "react";
import "./Years.css";

type YearsProps = {
  start: number;
  end: number;
  prevStart: number;
  prevEnd: number;
};

function Years({ start, end, prevStart, prevEnd }: YearsProps) {
  const [displayStart, setDisplayStart] = useState(prevStart);
  const [displayEnd, setDisplayEnd] = useState(prevEnd);

  useEffect(() => {
    let s = prevStart;
    let e = prevEnd;

    const stepStart = start > s ? 1 : -1;
    const stepEnd = end > e ? 1 : -1;

    const interval = setInterval(() => {
      let done = true;

      if (s !== start) {
        s += stepStart;
        setDisplayStart(s);
        done = false;
      }

      if (e !== end) {
        e += stepEnd;
        setDisplayEnd(e);
        done = false;
      }

      if (done) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [start, end, prevStart, prevEnd]);

  return (
    <h3>
      <span className="startDate">{displayStart}</span>
      <span className="endDate">{displayEnd}</span>
    </h3>
  );
}

export default Years;
