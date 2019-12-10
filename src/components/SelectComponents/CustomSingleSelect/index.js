
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { isEmpty } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {}
  };
};

const CustomSingleSelect = ({ classes, value, placeholder, changed, items }) => {

  return (
    <Select
      displayEmpty
      value={value}
      onChange={changed}
      className={classes.root}
    >
      {
        !isEmpty(placeholder) &&
        <MenuItem
          key='default'
          value=''
          disabled>
          {placeholder}
        </MenuItem>
      }
      {items.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default withStyles(styles, { withTheme: true })(CustomSingleSelect);
