
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { SelectValidator } from 'react-material-ui-form-validator';

const styles = theme => {
  return {
    root: {},
    selectMenu: {
      backgroundColor: theme.palette.mainBackColor,
      maxHeight: 250
    }
  };
};

const CustomSelectValidator = ({ classes, label, value, changed, items }) => {

  return (
    <SelectValidator
      SelectProps={{
        MenuProps: {
          classes: { paper: classes.selectMenu }
        }
      }}
      className={classes.root}
      label={label}
      value={value}
      margin='normal'
      onChange={changed}
      validators={['required']}
      errorMessages={[`Please select ${label}`]}>
      {items.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </SelectValidator>
  );
};

export default withStyles(styles, { withTheme: true })(CustomSelectValidator);
