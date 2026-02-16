import React from "react";

import "./Years.css";

type yearsProps = {
  start: number;
  end: number;
};

function Years({ start, end }: yearsProps) {
  return (
    <h3>
      <span className="startDate">{start}</span>
      <span className="endDate">{end}</span>
    </h3>
  );
}

export default Years;
