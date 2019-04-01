import React from 'react';
import { connect } from 'react-redux';

import './List.css';
import editIcon from '../componentSettings/editIcon.png';

// import components
import Card from '../Card/Card';
// import actions
import { setBoardContent } from '../../actions/boardContentActions';
import { setTargetComponent } from '../../actions/moveComponentActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import { LIST } from '../../constants/activeBoardConstants';
import {DRAG_CARD, DRAG_LIST} from '../../constants/moveComponentConstants'

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    targetComponent: state.moveComponent.targetComponent,
    hoveredComponent: state.moveComponent.hoveredComponent,
    activeBoard: state.boardInfo.activeBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),
    setTargetComponent: (targetComponent, hoveredComponent, componentType) =>
      dispatch(setTargetComponent(targetComponent, hoveredComponent, componentType)),
    toggleSettingsMenu: (menuType, targetId) =>
      dispatch(toggleSettingsMenu(menuType, targetId)),
  };
};

const List = ({
  list,
  targetComponent,
  hoveredComponent,
  setBoardContent,
  activeBoard,
  setTargetComponent,
  toggleSettingsMenu
}) => {
  const handleListDragOver = list => {
    if (hoveredComponent && hoveredComponent.listId !== list.listId) {
      console.log(targetComponent, hoveredComponent)
      let body = {
        newList: list,
        targetCard: targetComponent
      };

      postFetch('/card/move', body).then(() => {
        setBoardContent(activeBoard.id);
        setTargetComponent(targetComponent, list, DRAG_CARD);
      });
    }
    else if(!hoveredComponent){
      console.log('list hover')
    }
  };

  const handleEditClick = () => {
    toggleSettingsMenu(LIST, list.listId);
  };

  const handleListClick = () => {
    // setTargetList(list, list)
  }

  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} list={list} />);
    return acc;
  }, []);

  return (
    <div className="listContainer" onDragOver={() => handleListDragOver(list)} onMouseDown={handleListClick} draggable>
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
