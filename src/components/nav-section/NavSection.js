import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, Collapse, IconButton, ListItemIcon } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], setOpenDrawer, open, ...other }) {
  
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem openDrawer={open} setOpenDrawer={setOpenDrawer} key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}



NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, setOpenDrawer, openDrawer}) {
  const { title, path, icon, info } = item;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpenDrawer(true)
    setOpen(!open);
  }

  const dispatch = useDispatch()
  
  const handleOpenDrawer = () => {
    setOpenDrawer(false)
    dispatch({type: 'openSidebar/setOpenSidebar', payload: false })
  }
  const SortbyID = (a, b) => {
    return a.sorting_id - b.sorting_id
  }
  return (
    <>

      {
        item.children && item.children.length > 0 ? (
          <>
            <StyledNavItem
              sx={{
                '&.active': {
                  color: 'text.primary',
                  bgcolor: 'action.selected',
                  fontWeight: 'fontWeightBold',
                },
              }}
              onClick={handleOpen}

            >
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>


              <ListItemText sx ={{color: 'black'}} disableTypography primary={title} />
              <ListItemIcon>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>


            </StyledNavItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <NavSection setOpenDrawer={setOpenDrawer} open={openDrawer} data={title === "Group Object" ? item.children.sort(SortbyID): item.children} />
            </Collapse>
          </>
        ) : (
          <>
            <StyledNavItem
              component={RouterLink}
              to={path}
              sx={{
                '&.active': {
                  color: 'text.primary',
                },
              }}
              onClick={handleOpenDrawer}
            >
              <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
              <ListItemText sx ={{color: 'black'}} disableTypography primary={title} />
            </StyledNavItem>
          </>
        )
      }


    </>

  );
}
