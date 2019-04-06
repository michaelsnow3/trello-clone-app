import React from 'react';

import './BoardColourOptions.css';

const BoardColourOptions = () => {
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

  const handleColourClick = colour => {
    console.log(colour);
  };

  const boardColourComponents = boardColourOptions.reduce((acc, colour, i) => {
    const backgroundColourStyle = { backgroundColor: colour };
    acc.push(
      <div
        style={backgroundColourStyle}
        className="boardColour"
        onClick={() => handleColourClick(colour)}
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
