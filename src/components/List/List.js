import React from 'react';

const List = ({ list }) => {
  console.log(list)
  return (
    <div>{list.listTitle}</div>
  )
}

export default List