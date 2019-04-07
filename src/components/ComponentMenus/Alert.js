import React from 'react';

const Alert = ({ message, confirmCallback, denyCallback }) => {
  return (
    <div>
      <div className="alertHeader">{message}</div>
      <div className="alertOptions">
        <div className="alertText" onClick={confirmCallback}>
          Yes
        </div>
        <div className="alertText" onClick={denyCallback}>
          No
        </div>
      </div>
    </div>
  );
};

export default Alert;
