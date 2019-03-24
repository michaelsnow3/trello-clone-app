import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ activeBoard: state.boardInfo.activeBoard });

function DisplayBoard({ activeBoard }) {
  let boardTitle = activeBoard && activeBoard.title
  return <h1>{boardTitle}</h1>;
}

export default connect(mapStateToProps)(DisplayBoard);
