
import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { showErrorToast } from '../../../utils/utility';
import notifications from '../../../constants/notifications';

const styles = theme => {
  return {
    root: {},
    input: {
      margin: 0
    }
  };
};

const CustomLimitMultiAutocomplete = ({ classes, value, placeholder, onChange, options, limit }) => {
  const [open, setOpen] = useState(false);

  const changeHandler = (value) => {

    if (value.length > limit) {
      showErrorToast(notifications.MULTI_SELECT_LIMIT_ITEM_ERROR.replace('limit', limit));
    } else {
      if (value.length === limit) {
        setOpen(false);
      }
      onChange(value);
    }
  }

  const openHandler = () => {
    setOpen(true);
  }

  const closeHandler = () => {
    setOpen(false);
  }

  return (
    <Autocomplete
      id='auto-select'
      multiple
      open={open}
      onOpen={openHandler}
      onClose={closeHandler}
      value={value}
      options={options}
      onChange={(event, newValue) => {
        changeHandler(newValue);
      }}
      className={classes.root}
      autoSelect
      renderInput={params => (
        <TextField
          {...params}
          label={''}
          placeholder={placeholder}
          margin='normal'
          fullWidth
          className={classes.input} />
      )}
    />
  );
};

CustomLimitMultiAutocomplete.defaultProps = {
  limit: 2
};

export default withStyles(styles, { withTheme: true })(CustomLimitMultiAutocomplete);
