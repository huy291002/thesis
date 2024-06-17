import { ListItem, ListItemButton, List, Box, IconButton } from '@mui/material'
import React from 'react'

import { Draggable } from 'react-beautiful-dnd'
function Drag({ id, index, handleDelete, ...props }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
              {props.children}
        </Box>
      )}
    </Draggable>
  )
}

export default Drag