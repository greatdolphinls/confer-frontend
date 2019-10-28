
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Select, Input, MenuItem } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1.5)
    },
    label: {
      width: 205,
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    select: {
      width: 325
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

const EditableMultiSelect = ({
  classes, options, isEdit, label, value, placeholder, onChange
}) => {

  const valueRender = () => {
    let data = '';
    value.map((name, index) => {
      if (index !== 0) {
        data += ', ';
      }
      data += name;
      return null;
    })
    return data;
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
      {
        isEdit ?
          <Select
            multiple
            input={<Input id="select-multiple" />}
            value={value}
            onChange={onChange}
            className={classes.select}
          >
            {options.map(({ value, label }, index) => (
              <MenuItem key={index} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select> :
          <Typography
            className={classes.value}>
            {valueRender() || placeholder}
          </Typography>
      }
    </main>
  );
};

EditableMultiSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableMultiSelect.defaultProps = {
  placeholder: 'No Data',
  options: [],
  isEdit: false,
  label: '',
  value: [],
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableMultiSelect);
