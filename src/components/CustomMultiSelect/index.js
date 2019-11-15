
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Select, Input, MenuItem, TextField } from '@material-ui/core';

import { showErrorToast } from '../../utils/utility';
import notifications from '../../constants/notifications';

const styles = theme => {
  return {
    root: {
    }
  };
};

const CustomMultiSelect = ({ classes, value, placeholder, changed, items }) => {
  const [open, setOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState(false);
  
  const onChange = (event) => {
    const { value } = event.target;
    const selectedOther = value.includes('Other');
    
    if (selectedOther){
      setSelectedInput(true);
      changed([]);
    } else {
      if(value.length > 2){
        showErrorToast(notifications.MULTI_SELECT_TWO_ITEM_ERROR);
      } else {
        if(value.length === 2){
          setOpen(false);
        }
        changed(value);
      }
    }
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    if(!value) {
      setSelectedInput(false);
      changed([]);
    } else {
      changed([value]);
    }
  }

  const openHandler = () => {
    setOpen(true);
  }

  const closeHandler = () => {
    setOpen(false);
  }

  if (selectedInput) {
    return (
      <TextField
        name='other'
        value={value[0] || ''}
        onChange={onInputChange}
        className={classes.root}
        placeholder='other (write your own)' />
    )
  } else {
    return (
      <Select
        multiple
        displayEmpty
        open={open}
        onOpen={openHandler}
        onClose={closeHandler}
        input={<Input id='select-multiple' />}
        value={value}
        onChange={onChange}
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
        <MenuItem value='Other'>
          other (write your own)
        </MenuItem>
      </Select>
    );
  }
};

export default withStyles(styles, { withTheme: true })(CustomMultiSelect);
