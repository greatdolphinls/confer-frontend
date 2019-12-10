
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => {
  return {
    root: {
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
      margin: 0,
      width: '100%'
    },
    value: {
      fontSize: 12,
      opacity: 0.6
    }
  };
};

const EditableTextarea = ({ classes, rows, isEdit, label, value, placeholder, onChange }) => {
  return (
    <main className={classes.root}>
      {
        !!label &&
        <div>
          <Typography
            className={classes.label}
          >
            {`${label}:`}
          </Typography>
        </div>
      }
      {
        isEdit ?
          <TextField
            rows={rows}
            multiline
            margin='normal'
            className={classes.textField}
            defaultValue={value}
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

EditableTextarea.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableTextarea.defaultProps = {
  rows: 2,
  placeholder: 'No Data',
  isEdit: false,
  label: '',
  value: '',
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableTextarea);
