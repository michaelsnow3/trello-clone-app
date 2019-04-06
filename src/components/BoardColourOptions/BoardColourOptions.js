import React from 'react';

import './BoardColourOptions.css';

const BoardColourOptions = ({ setActiveBoardColour }) => {
  const boardColourOptions = [
    'blue',
    'red',
    'orange',
    'aqua',
    'lime',
    'purple',
    'pink',
    'white'
  ];

  const boardColourComponents = boardColourOptions.reduce((acc, colour, i) => {
    const backgroundColourStyle = { backgroundColor: colour };
    acc.push(
      <div
        style={backgroundColourStyle}
        className="boardColour"
        onClick={() => setActiveBoardColour(colour)}
        key={i}
      />
    );
    return acc;
  }, []);

  return (
    <div className="boardColourOptionsContainer">{boardColourComponents}</div>
  );
};
export default BoardColourOptions;
