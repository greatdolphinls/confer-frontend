
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { Avatar } from '../index';
import { logoutUser } from '../../actions';
import { pageLinks } from '../../constants/links'

const styles = theme => {
  return {
    root: {
      marginLeft: theme.spacing(3)
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
      fontWeight: 'normal'
    }
  };
};

const ProfileDropdown = ({ classes, avatar }) => {
  const { user } = useSelector(state => state.auth, []);

  const dispatch = useDispatch();
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

  const logoutHandler = () => {
    dispatch(logoutUser());
  }

  return (
    <div className={classes.root}>
      <div
        className={classes.avatar}
        ref={anchorRef}
        onClick={handleToggle}>
        <Avatar
          src={avatar}
          size={48}
          isBorder
        />
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
                  {user.isProfile &&
                    <MenuItem
                      component={Link}
                      to={pageLinks.ProfileOverview.url}
                      onClick={handleClose}
                      className={classes.item}>
                      {pageLinks.ProfileOverview.title}
                    </MenuItem>
                  }
                  <MenuItem
                    component={Link}
                    to={pageLinks.AccountManage.url}
                    onClick={handleClose}
                    className={classes.item}>
                    {pageLinks.AccountManage.title}
                  </MenuItem>
                  <MenuItem
                    className={classes.item}
                    onClick={logoutHandler}>
                    Log Out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

ProfileDropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(ProfileDropdown);
