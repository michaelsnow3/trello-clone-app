import React from 'react';
import { connect } from 'react-redux';

import './List.css';
import editIcon from '../componentSettings/editIcon.png';

// import components
import Card from '../Card/Card';

// import actions
import { setBoardContent } from '../../actions/boardContentActions';
import { setTargetCard } from '../../actions/moveCardActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import { LIST } from '../../constants/activeBoardConstants';

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
      dispatch(setTargetCard(targetCard, currentList)),
    toggleSettingsMenu: (menuType, targetId) =>
      dispatch(toggleSettingsMenu(menuType, targetId))
  };
};

const List = ({
  list,
  targetCard,
  currentList,
  setBoardContent,
  activeBoard,
  setTargetCard,
  toggleSettingsMenu
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

  const handleEditClick = () => {
    toggleSettingsMenu(LIST, list.listId);
  };

  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} list={list} />);
    return acc;
  }, []);

  return (
    <div className="listContainer" onDragOver={() => handleListDragOver(list)}>
      <div className="listHeader">
        <div className="listTitle">{list.listTitle}</div>
        <img
          src={editIcon}
          alt="edit icon"
          className="listEditIcon"
          onClick={handleEditClick}
        />
      </div>
      <div className="listCards">{listCards}</div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
