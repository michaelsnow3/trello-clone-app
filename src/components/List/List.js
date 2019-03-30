import React from 'react';
import { connect } from 'react-redux';

import './List.css';

// import components
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';
import ListMenu from '../dropdownMenu/ListMenu';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';
import { setTargetCard } from '../../actions/moveCardActions';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    targetCard: state.moveCard.targetCard,
    currentList: state.moveCard.currentList,
    activeBoard: state.boardInfo.activeBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),
    setTargetCard: (targetCard, currentList) =>
      dispatch(setTargetCard(targetCard, currentList))
  };
};

const List = ({
  list,
  boardId,
  targetCard,
  currentList,
  setBoardContent,
  activeBoard,
  setTargetCard
}) => {
  const handleListDragOver = list => {
    if (currentList && currentList.listId !== list.listId) {
      let body = {
        newList: list,
        targetCard
      };

      postFetch('/card/move', body).then(() => {
        setBoardContent(activeBoard.id);
        setTargetCard(targetCard, list);
      });
    }
  };

  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} list={list} />);
    return acc;
  }, []);
  listCards.push(<AddCard key={-1} boardId={boardId} listId={list.listId} />);

  return (
    <div className="listContainer" onDragOver={() => handleListDragOver(list)}>
      <div className="listHeader">
        <div className="listTitle">{list.listTitle}</div>
        <ListMenu listId={list.listId} boardId={boardId} />
      </div>
      <div className="listCards">{listCards}</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
