
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { MenuIconButton } from '..';

const styles = theme => {
  return {
    root: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      }
    },
    avatar: {
      cursor: 'pointer'
    },
    paper: {
      backgroundColor: theme.palette.mainBackColor
    },
    item: {
      opacity: 0.6,
      fontSize: 14,
      fontWeight: 'normal',
      cursor: 'pointer'
    }
  };
};

const MenuDropdown = ({ classes, items, history }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div
        className={classes.avatar}
        ref={anchorRef}
        onClick={handleToggle}>
        <MenuIconButton />
      </div>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'center top' }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {items.map((item, index) => (
                    <MenuItem
                      key={index}
                      component={Link}
                      to={item.url}
                      onClick={handleClose}
                      className={classes.item}>
                      {item.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

MenuDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(MenuDropdown);
