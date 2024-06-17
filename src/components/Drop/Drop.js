import { List } from '@mui/material'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
function Drop({id, type, ...props}) {
  return (
    <Droppable droppableId={id} type={type}>
        {(provided) => (
            <List sx ={{paddingTop: id === "upload" ? 0 : 1}} ref={provided.innerRef} {...provided.droppableProps} {...props}>
                {props.children}
                {provided.placeholder}
            </List>
        )}
    </Droppable>
  )
}

export default Drop