
import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { showErrorToast } from '../../../utils/utility';
import notifications from '../../../constants/notifications';

const styles = theme => {
  return {
    root: {
    }
  };
};

const CustomLimitMultiSelect = ({ classes, value, placeholder, changed, items, limit }) => {
  const [open, setOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState(false);

  const onChange = (event) => {
    const { value } = event.target;
    const selectedOther = value.includes('Other');

    if (selectedOther) {
      setSelectedInput(true);
      changed([]);
    } else {
      if (value.length > limit) {
        showErrorToast(notifications.MULTI_SELECT_LIMIT_ITEM_ERROR.replace('limit', limit));
      } else {
        if (value.length === limit) {
          setOpen(false);
        }
        changed(value);
      }
    }
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    if (!value) {
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

CustomLimitMultiSelect.defaultProps = {
  limit: 2
};

export default withStyles(styles, { withTheme: true })(CustomLimitMultiSelect);
