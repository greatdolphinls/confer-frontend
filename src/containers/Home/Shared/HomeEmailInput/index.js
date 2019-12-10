import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { TextValidator } from 'react-material-ui-form-validator';

const styles = theme => {
  return {
    root: {
      width: 280,
      margin: `${theme.spacing(1)}px 0`,
      [theme.breakpoints.down('xs')]: {
        width: 200
      },
      '& input': {
        textAlign: 'center',
        borderBottom: `2px solid ${theme.palette.buttonColor}`,
        color: theme.palette.buttonColor
      },
      '& div:before': {
        borderColor: theme.palette.buttonColor
      },
      '& div:after': {
        borderColor: theme.palette.buttonColor
      }
    }
  };
};

const HomeEmailInput = ({ classes, ...props }) => {
  return (
    <TextValidator
      name='email'
      placeholder='Enter your email address '
      className={classes.root}
      validators={['isEmail', 'required']}
      errorMessages={['Email is not valid', 'Email cannot be empty']}
      {...props} />
  );
};

HomeEmailInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeEmailInput);
