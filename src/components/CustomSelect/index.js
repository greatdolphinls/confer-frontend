
import React, { useRef, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const styles = theme => {
  return {
    root: {},
    select: {
      '& .MuiSelect-select': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
      }
    }
  };
};

const CustomSelect = ({ classes, label, value, onChange, options }) => {

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant='outlined' className={classes.root}>
      <InputLabel ref={inputLabel}>
        {label}
      </InputLabel>
      <Select
        native
        value={value}
        onChange={onChange}
        labelWidth={labelWidth}
        className={classes.select}
      >
        {options.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles, { withTheme: true })(CustomSelect);
