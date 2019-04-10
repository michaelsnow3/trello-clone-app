import React from 'react';
import { connect } from 'react-redux';

import './List.css';
import editIcon from '../../images/editIcon.png';

// import components
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';

// import actions
import { updateListPosition } from '../../actions/boardActions';
import { setTargetComponent } from '../../actions/moveComponentActions';
import { toggleSettingsMenu } from '../../actions/boardActions';

// import constants
import { LIST } from '../../constants/settingsMenuConstants';
import { DRAG_CARD, DRAG_LIST } from '../../constants/moveComponentConstants';

import { postFetch } from '../../fetchRequests';

const mapStateToProps = state => {
  return {
    targetComponent: state.moveComponent.targetComponent,
    componentType: state.moveComponent.componentType,
    activeBoard: state.activeBoard.board,
    boardLists: state.boardContent.boardLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTargetComponent: (targetComponent, componentType) =>
      dispatch(setTargetComponent(targetComponent, componentType)),

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
  componentType,
  updateListPosition,
  activeBoard,
  setTargetComponent,
  toggleSettingsMenu,
  boardLists
}) => {
  const handleListDragOver = (list, event) => {
    event.preventDefault();
    if (
      componentType === DRAG_CARD &&
      targetComponent.list_id !== list.listId
    ) {
      let updatedBoardLists = boardLists.reduce((acc, boardList) => {
        if (boardList.listId === targetComponent.list_id) {
          let updatedListCards = boardList.listCards.filter(card => {
            return card.id !== targetComponent.id;
          });
          acc.push({ ...boardList, listCards: updatedListCards });
        } else if (boardList.listId === list.listId) {
          let updatedListCards = [...boardList.listCards, targetComponent];
          acc.push({ ...boardList, listCards: updatedListCards });
        } else {
          acc.push(boardList);
        }
        return acc;
      }, []);

      let updatedTargetCard = { ...targetComponent, list_id: list.listId };
      setTargetComponent(updatedTargetCard, DRAG_CARD);

      updateListPosition(updatedBoardLists);
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
      setTargetComponent(updatedTargetList, DRAG_LIST);

      updateListPosition(updatedBoardLists);
    }
  };

  const updateListDatabase = () => {
    let body = {
      boardLists
    };
    postFetch('/list/update/', body);
  };

  const handleDrop = () => {
    if (componentType === DRAG_LIST) {
      updateListDatabase();
    } else if (componentType === DRAG_CARD) {
      let body = {
        targetCard: targetComponent,
        newList: list
      };
      postFetch('/card/move', body);
    }
  };

  const handleEditClick = () => {
    toggleSettingsMenu(LIST, list.listId);
  };

  const handleListClick = () => {
    setTargetComponent(list, DRAG_LIST);
  };

  const listCards = list.listCards.reduce((acc, card, i) => {
    acc.push(<Card key={i} card={card} list={list} />);
    return acc;
  }, []);

  listCards.push(
    <AddCard key={-1} boardId={activeBoard.id} listId={list.listId} />
  );

  return (
    <div
      className="listDropZone"
      onDragOver={event => handleListDragOver(list, event)}
      onDropCapture={handleDrop}
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
