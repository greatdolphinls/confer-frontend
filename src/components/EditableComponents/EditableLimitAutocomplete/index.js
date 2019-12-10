
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { showErrorToast } from '../../../utils/utility';
import notifications from '../../../constants/notifications';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    label: {
      width: 205,
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: theme.spacing(1)
    },
    select: {
      width: 325,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    value: {
      fontSize: 12,
      opacity: 0.6
    }
  };
};

const EditableLimitAutocomplete = ({
  classes, options, isEdit, label, value, placeholder, onChange, limit
}) => {

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

  const editContainerRender = () => {
    if (isEdit) {
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
          className={classes.select}
          autoSelect
          renderInput={params => (
            <TextField
              {...params}
              label=''
              margin='normal'
              fullWidth
              className={classes.input} />
          )}
        />
      );
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

EditableLimitAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableLimitAutocomplete.defaultProps = {
  limit: 2,
  placeholder: 'No Data',
  options: [],
  isEdit: false,
  label: '',
  value: [],
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableLimitAutocomplete);
