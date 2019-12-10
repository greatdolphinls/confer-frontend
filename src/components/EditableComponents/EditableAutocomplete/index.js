
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    select: {
      width: 325,
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

const EditableAutocomplete = ({
  classes, options, isEdit, label, value, placeholder, onChange
}) => {

  const editContainerRender = () => {
    if (isEdit) {
      return (
        <Autocomplete
          id='auto-select'
          value={value}
          options={options}
          onChange={(event, newValue) => {
            onChange(newValue);
          }}
          className={classes.select}
          autoSelect
          renderInput={params => (
            <TextField
              {...params}
              label=''
              margin='normal'
              fullWidth
              className={classes.input} />
          )}
        />
      );
    }
  }

  const showContainerRender = () => {
    if (!isEdit) {
      return (
        <Typography
          className={classes.value}>
          {value || placeholder}
        </Typography>
      )
    }
  }

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
      {editContainerRender()}
      {showContainerRender()}
    </main>
  );
};

EditableAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableAutocomplete.defaultProps = {
  placeholder: 'No Data',
  options: [],
  isEdit: false,
  label: '',
  value: [],
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableAutocomplete);
