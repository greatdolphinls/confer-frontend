
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';

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

const EditableSelect = ({ classes, options, isEdit, label, value, placeholder, onChange }) => {
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
            native
            value={value || ''}
            onChange={onChange}
            className={classes.select}
          >
            <option key='default' value='' />
            {options.map(({ value, label }, index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </Select> :
          <Typography
            className={classes.value}>
            {value || placeholder}
          </Typography>
      }
    </main>

  );
};

EditableSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableSelect.defaultProps = {
  placeholder: 'No Data',
  options: [],
  isEdit: false,
  label: '',
  value: '',
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableSelect);
