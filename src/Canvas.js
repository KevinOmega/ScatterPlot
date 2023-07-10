import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./canvas.css";
import * as d3 from "d3";

const Canvas = () => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [drawed, setDrawed] = useState(false);

  const fetchData = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setFetched(true));
  };

  const drawData = useCallback(() => {
    const svg = d3
      .select("#canvas-container")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("background", "red");
  }, []);

  useEffect(() => {
    if (!fetched) {
      fetchData();
    }
  }, [fetched]);

  useEffect(() => {
    if (data.length && !drawed) {
      setDrawed(true);
      drawData();
    }
  }, [data, drawData, drawed]);

  return (
    <div className="app-center">
      <div className="title">
        <h1 id="#title">Doping in Professional Bicycle Racing</h1>
      </div>
      <div id="canvas-container"></div>
    </div>
  );
};

export default Canvas;
