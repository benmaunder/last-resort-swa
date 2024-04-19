import React from 'react';
import "../App.css";
import { Stage, Layer, Line } from 'react-konva';

const DrawTool = () => {
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [size, setSize] = React.useState('5');
  const [color, setColor] = React.useState('#df4b26');
  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, size, color, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyItems: "center",
        padding: "1rem 1rem",
        height: "100%"
      }}
    >
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <select
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <option value="2">Tiny</option>
        <option value="5">Small</option>
        <option value="11">Medium</option>
        <option value="23">Big</option>
        <option value="47">Very Big</option>
        <option value="95">Large</option>
      </select>
      <select
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      >
        <option value="#000000">Black</option>
        <option value="#df4b26">Red</option>
        <option value="#1134a6">Blue</option>
        <option value="#fce205">Yellow</option>
        <option value="#0b6623">Green</option>
        <option value="#FF00FF">Fabulous</option>
      </select>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={parseInt(line.size)}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawTool;
