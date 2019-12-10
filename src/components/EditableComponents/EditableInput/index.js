
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    label: {
      width: 205,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: theme.spacing(1)
    },
    textField: {
      width: 325,
      margin: 0,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    value: {
      fontSize: 12,
      opacity: 0.6
    }
  };
};

const EditableInput = ({ classes, isEdit, label, value, placeholder, onChange }) => {
  return (
    <main className={classes.root}>
      {
        !!label &&
        <Typography
          className={classes.label}
        >
          {`${label}:`}
        </Typography>
      }
      {
        isEdit ?
          <TextField
            className={classes.textField}
            defaultValue={value}
            margin='normal'
            onChange={onChange}
            inputProps={{ 'aria-label': 'bare' }}
          /> :
          <Typography
            className={classes.value}>
            {value || placeholder}
          </Typography>
      }
    </main>
  );
};

EditableInput.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableInput.defaultProps = {
  placeholder: 'No Data',
  isEdit: false,
  label: '',
  value: '',
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableInput);
