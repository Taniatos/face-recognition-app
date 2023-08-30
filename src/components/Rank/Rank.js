import React from "react";
import "./Rank.css";

export default function Rank({ name, entries }) {
  return (
    <div className="rank-style">
      <div className="black f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="black f1">{entries}</div>
    </div>
  );
}