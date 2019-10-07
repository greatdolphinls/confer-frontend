
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 422,
      height: 52,
      borderRadius: 4,
      border: `1px solid ${theme.palette.borderColor}`,
      backgroundColor: theme.palette.mainBackColor,
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    fillName: {
      backgroundColor: theme.palette.subBackColor4,
    }
  };
};

const CandidateNameItem = ({ classes, name }) => {

  return (
    <Typography className={classNames(classes.root, { [classes.fillName]: !!name })}>
      {name}
    </Typography>
  );
};

CandidateNameItem.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string
};

CandidateNameItem.defaultProps = {
  name: ''
};

export default withStyles(styles, { withTheme: true })(CandidateNameItem);
