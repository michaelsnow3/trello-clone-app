import React from 'react';

import './List.css'

const List = ({ list }) => {
  console.log(list)
  return (
    <div className='listContainer'>{list.listTitle}</div>
  )
}

export default List