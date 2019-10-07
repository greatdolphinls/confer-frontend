
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      minWidth: 156,
      fontSize: 14,
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px 0`,
      [theme.breakpoints.down('xs')]: {
        minWidth: 96,
      }
    },
    selected: {
      backgroundColor: theme.palette.subBackColor3,
      color: theme.palette.buttonColor
    }
  };
};

const TagItem = ({ classes, name, selected, onSelect }) => {

  return (
    <Chip
      label={name}
      onClick={onSelect(name)}
      className={classNames(classes.root, { [classes.selected]: selected })} />
  );
};

export default withStyles(styles, { withTheme: true })(TagItem);
