
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

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

  const editContainerRender = () => {
    if (isEdit) {
      return (
        <Select
          multiple
          displayEmpty
          input={<Input id='select-multiple' />}
          value={value}
          onChange={onChange}
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
        </Select>
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
