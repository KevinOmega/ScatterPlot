import React, { useEffect, useState } from "react";
import "./canvas.css";

const Canvas = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
