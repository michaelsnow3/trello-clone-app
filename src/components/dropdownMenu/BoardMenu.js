import React from 'react'
import {Dropdown, DropdownButton} from 'react-bootstrap'

const BoardMenu = () => {
  return(
    <div>
      <DropdownButton id="dropdown-basic-button" title='Edit'>
        <Dropdown.Item href="#/action-1">Edit Board Title</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Delete Board</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}


export default BoardMenu
