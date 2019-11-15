
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Select, Input, MenuItem, TextField } from '@material-ui/core';

import { showErrorToast, isEmpty } from '../../../utils/utility';
import notifications from '../../../constants/notifications';

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
  const [open, setOpen] = useState(false);
  const [selectedInput, setSelectedInput] = useState(false);

  useEffect(() => {
    const targetIndex = options.findIndex(option => (
      option.value === value
    ));

    if (!isEmpty(value) && targetIndex < 0) {
      setSelectedInput(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelect = (event) => {
    const { value } = event.target;
    const selectedOther = value.includes('Other');

    if (selectedOther) {
      setSelectedInput(true);
      onChange([]);
    } else {
      if (value.length > 2) {
        showErrorToast(notifications.MULTI_SELECT_TWO_ITEM_ERROR);
      } else {
        if (value.length === 2) {
          setOpen(false);
        }
        onChange(value);
      }
    }
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setSelectedInput(false);
      onChange([]);
    } else {
      onChange([value]);
    }
  }

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

  const openHandler = () => {
    setOpen(true);
  }

  const closeHandler = () => {
    setOpen(false);
  }

  const editContainerRender = () => {
    if (isEdit) {
      if (selectedInput) {
        return (
          <TextField
            name='other'
            value={value[0] || ''}
            onChange={onInputChange}
            className={classes.select}
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
            onChange={onSelect}
            renderValue={selected => {
              if (selected.length === 0) {
                return placeholder;
              }
              return selected.join(', ');
            }}
            className={classes.select}
          >
            <MenuItem value='' disabled>
              {placeholder}
            </MenuItem>
            {options.map(({ value, label }, index) => (
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
    }
  }

  const showContainerRender = () => {
    if (!isEdit) {
      return (
        <Typography
          className={classes.value}>
          {valueRender() || placeholder}
        </Typography>
      )
    }
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
      {editContainerRender()}
      {showContainerRender()}
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
