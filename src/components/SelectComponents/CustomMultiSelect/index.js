
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => {
  return {
    root: {}
  };
};

const CustomMultiSelect = ({ classes, value, placeholder, changed, items }) => {

  return (
    <Select
      multiple
      displayEmpty
      input={<Input id='select-multiple' />}
      value={value}
      onChange={changed}
      renderValue={selected => {
        if (selected.length === 0) {
          return placeholder;
        }
        return selected.join(', ');
      }}
      className={classes.root}
    >
      <MenuItem value='' disabled>
        {placeholder}
      </MenuItem>
      {items.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default withStyles(styles, { withTheme: true })(CustomMultiSelect);
