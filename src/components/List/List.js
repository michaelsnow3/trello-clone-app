import React from 'react';
import { connect } from 'react-redux';

import './List.css';
import editIcon from '../componentSettings/editIcon.png';

// import components
import Card from '../Card/Card';
// import actions
import {
  setBoardContent,
  updateListPosition
} from '../../actions/boardContentActions';
import { setTargetComponent } from '../../actions/moveComponentActions';
import { toggleSettingsMenu } from '../../actions/activeBoardActions';

// import constants
import { LIST } from '../../constants/activeBoardConstants';
import { DRAG_CARD, DRAG_LIST } from '../../constants/moveComponentConstants';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    targetComponent: state.moveComponent.targetComponent,
    hoveredComponent: state.moveComponent.hoveredComponent,
    componentType: state.moveComponent.componentType,
    activeBoard: state.boardInfo.activeBoard,
    boardLists: state.boardContent.boardLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBoardContent: boardId => setBoardContent(boardId)(dispatch),

    setTargetComponent: (targetComponent, hoveredComponent, componentType) =>
      dispatch(
        setTargetComponent(targetComponent, hoveredComponent, componentType)
      ),

    toggleSettingsMenu: (menuType, targetId) =>
      dispatch(toggleSettingsMenu(menuType, targetId)),

    updateListPosition: boardLists => {
      dispatch(updateListPosition(boardLists));
    }
  };
};

const List = ({
  list,
  targetComponent,
  hoveredComponent,
  componentType,
  updateListPosition,
  setBoardContent,
  activeBoard,
  setTargetComponent,
  toggleSettingsMenu,
  boardLists
}) => {
  const handleListDragOver = (list, event) => {
    event.preventDefault();
    if (
      componentType === DRAG_CARD &&
      hoveredComponent.listId !== list.listId
    ) {
      let body = {
        newList: list,
        targetCard: targetComponent
      };

      postFetch('/card/move', body).then(() => {
        setBoardContent(activeBoard.id);
        setTargetComponent(targetComponent, list, DRAG_CARD);
      });
    } else if (
      componentType === DRAG_LIST &&
      targetComponent.listPosition !== list.listPosition
    ) {
      const previousPosition = targetComponent.listPosition;
      const newPosition = list.listPosition;

      let updatedBoardLists = boardLists.reduce((acc, boardList) => {
        if (boardList.listId === targetComponent.listId) {
          acc.push({ ...boardList, listPosition: newPosition });
        } else if (boardList.listId === list.listId) {
          acc.push({ ...boardList, listPosition: previousPosition });
        } else {
          acc.push(boardList);
        }
        return acc;
      }, []);

      let updatedTargetList = { ...targetComponent, listPosition: newPosition };
      setTargetComponent(updatedTargetList, list, DRAG_LIST);

      updateListPosition(updatedBoardLists);
    }
  };

  const updateListDatabase = () => {
    let body = {
      boardLists
    };
    postFetch('/list/update/', body);
  };

  const handleEditClick = () => {
    toggleSettingsMenu(LIST, list.listId);
  };

  const handleListClick = () => {
    setTargetComponent(list, list, DRAG_LIST);
  };

  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} list={list} />);
    return acc;
  }, []);

  return (
    <div
      className="listDropZone"
      onDragOver={(event) => handleListDragOver(list, event)}
      onDropCapture={updateListDatabase}
    >
      <div className="listContainer" onMouseDown={handleListClick} draggable>
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
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
