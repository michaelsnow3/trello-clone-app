import React from 'react';

const Scroll = props => {
  return (
    <div
      style={{
        overflowY: 'scroll',
        border: '1px solid black',
        height: '6rem',
        width: '18rem',
        backgroundColor: 'rgb(214, 214, 214)'
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
