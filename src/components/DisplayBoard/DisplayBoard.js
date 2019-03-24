import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ activeBoard: state.boardInfo.activeBoard });

function DisplayBoard({ activeBoard }) {
  return <h1>{activeBoard.title}</h1>;
}

export default connect(mapStateToProps)(DisplayBoard);
