import React, { useCallback, useEffect, useRef, useState } from "react";
import "./canvas.css";
import * as d3 from "d3";

const Canvas = () => {
  const [data, setData] = useState([]);
  const [drawed, setDrawed] = useState(false);
  const containerRef = useRef();

  const fetchData = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.map((d) => {
            const parsedTime = d.Time.split(":");
            const newTime = new Date(
              1950,
              0,
              1,
              0,
              parsedTime[0],
              parsedTime[1]
            );
            return { ...d, Time: newTime };
          })
        )
      );
  };

  const drawData = useCallback(() => {
    const width = containerRef.current.getBoundingClientRect().width;
    const height = containerRef.current.getBoundingClientRect().height;

    const svg = d3
      .select("#canvas-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    console.log(data[0]);
    const padding = 50;
    const timeFormat = d3.timeFormat("%M:%S");

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.Year))
      .range([padding, width - padding]);

    const yScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Time))
      .range([height - padding, padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);

    svg
      .append("g")
      .style("transform", `translateY(${height - padding + 10}px)`)
      .call(xAxis);

    svg
      .append("g")
      .style("transform", `translateX(${padding - 10}px)`)
      .call(yAxis);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

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
      <div id="canvas-container" ref={containerRef}></div>
    </div>
  );
};

export default Canvas;
