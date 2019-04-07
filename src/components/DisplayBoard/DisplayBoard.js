import React, { useState } from 'react';
import { connect } from 'react-redux';

import './DisplayBoard.css';
import editIcon from '../../images/editIcon.png';
import emptyStarIcon from '../../images/emptyStarIcon.png';
import goldStarIcon from '../../images/goldStarIcon.png';

import { postFetch } from '../../fetchRequests';

// import components
import List from '../List/List';
import SettingsMenu from '../ComponentMenus/SettingsMenu';
import AddList from '../AddList/AddList';

// import actions
import { toggleSettingsMenu } from '../../actions/boardActions';

// import constants
import { BOARD } from '../../constants/settingsMenuConstants';

const mapStateToProps = state => ({
  activeBoard: state.activeBoard.board,
  boardLists: state.boardContent.boardLists,
  showMenu: state.settingsMenu.showMenu
});

const mapDispatchToProps = dispatch => {
  return {
    toggleSettingsMenu: menuType => dispatch(toggleSettingsMenu(menuType))
  };
};

function DisplayBoard({
  activeBoard,
  boardLists,
  showMenu,
  toggleSettingsMenu
}) {
  let boardTitle = activeBoard && activeBoard.title;
  let boardId = activeBoard && activeBoard.id;
  let boardFavourite = activeBoard && activeBoard.favourite;
  let colour = activeBoard && (activeBoard.colour || 'white');

  // get total height of page and add buffer for add card addition input height

  let body = document.body,
    html = document.documentElement;

  let height =
    Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    ) + 50;

  let [favourite, setFavourite] = useState(boardFavourite);

  const sortedBoardLists = boardLists.sort((a, b) => {
    return a.listPosition - b.listPosition;
  });

  let boardListComponents = sortedBoardLists.reduce((acc, list, i) => {
    acc.push(
      <div style={{ backgroundColor: colour, height }}>
        <List key={i} list={list} boardId={boardId} />
      </div>
    );
    return acc;
  }, []);

  boardListComponents.push(
    <div style={{ backgroundColor: colour, height }}>
      <AddList key={-1} boardId={boardId} height={height} colour={colour} />
    </div>
  );

  const settingsMenuComponent = () => {
    if (showMenu) {
      return <SettingsMenu toggleSettingsMenu={toggleSettingsMenu} />;
    }
  };

  let starIcon = emptyStarIcon;

  if (favourite) {
    starIcon = goldStarIcon;
  }
  const handleFavouriteClick = () => {
    const body = { boardId, favourite: !favourite };
    postFetch('/board/favourite/', body)
      .then(data => data.json())
      .then(newFavourite => {
        setFavourite(newFavourite);
      })
      .catch(error => console.log('error toggling favourite'));
  };

  return (
    <div
      style={{ backgroundColor: colour, height }}
      className="displayBoardContainer"
    >
      <div className="boardHeader" style={{ backgroundColor: colour }}>
        <div className="boardTitle">{boardTitle}</div>
        <div className="boardSettings">
          <img
            onClick={() => toggleSettingsMenu(BOARD, boardId)}
            src={editIcon}
            className="boardEditIcon"
            alt="edit icon"
          />
          <img
            onClick={handleFavouriteClick}
            className="boardFavouriteStar"
            src={starIcon}
            alt="favourite star"
          />
        </div>
      </div>
      {settingsMenuComponent()}
      <div style={{ height }} className="boardLists">
        {boardListComponents}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayBoard);
