import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    activeBoard: state.boardInfo.activeBoard,
    username: state.userInfo.username
  };
};

const BoardMenu = ({ activeBoard, username }) => {
  let [redirect, setRedirect] = useState(false)
  const handleBoardEdit = () => {
    console.log('edit');
  };
  const handleBoardDelete = () => {
    let boardId = activeBoard.id;
    fetch(`http://localhost:8888/board/del/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boardId
      })
    })
      .then(() => {
        setRedirect(true);
      })
      .catch(error => console.log('error deleting board', error));
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={`/${username}/boards`} />;
    }
  }

  return (
    <div>
      {renderRedirect()}
      <DropdownButton id="dropdown-basic-button" title="Settings">
        <Dropdown.Item onClick={handleBoardEdit}>Edit Title</Dropdown.Item>
        <Dropdown.Item onClick={handleBoardDelete}>Delete Board</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(BoardMenu);
