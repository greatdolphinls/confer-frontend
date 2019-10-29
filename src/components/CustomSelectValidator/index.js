
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

const CustomSelectValidator = ({ classes, label, value, placeholder, changed, items }) => {

  return (
    <SelectValidator
      SelectProps={{
        MenuProps: {
          classes: { paper: classes.selectMenu }
        }
      }}
      className={classes.root}
      label={label}
      value={value || 'none'}
      margin='normal'
      onChange={changed}
      validators={['required']}
      errorMessages={[`Please select ${label}`]}>
      <MenuItem 
        key='default' 
        value='none'
        disabled>
        {placeholder || ''}
      </MenuItem>
      {items.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </SelectValidator>
  );
};

export default withStyles(styles, { withTheme: true })(CustomSelectValidator);
