
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = theme => {
  return {
    root: {},
    input: {
      margin: 0,
      '& div': {
        paddingRight: theme.spacing(1)
      },
      '& input': {
        color: theme.palette.buttonColor,
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(0.5),
        paddingLeft: theme.spacing(1.5)
      },
      '& svg': {
        color: theme.palette.buttonColor
      }
    }
  };
};

const CustomAutocomplete = ({ classes, label, value, onChange, options }) => {
  return (
    <Autocomplete
      id='auto-select'
      value={value}
      options={options}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      className={classes.root}
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
};

export default withStyles(styles, { withTheme: true })(CustomAutocomplete);
