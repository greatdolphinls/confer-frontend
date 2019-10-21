
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Avatar from '../Avatar';

import DefaultLogo from '../../assets/img/defaultLogo.jpg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5)
    },
    label: {
      width: 205,
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    value: {
      width: 165,
      height: 80,
      objectFit: 'cover',
      borderRadius: 2
    }
  };
};

const EditableImage = ({
  classes, isEdit, isAvatar, label, value, onChange
}) => {

  const onUploadHandler = () => {
    const image = 'https://images.unsplash.com/photo-1559423649-3129dd793cd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
    onChange(image);
  }

  return (
    <main className={classes.root}>
      <Typography
        className={classes.label}
      >
        {`${label}:`}
      </Typography>
      {
        isEdit
          ? <img
            alt='logoImage'
            onClick={onUploadHandler}
            src={value || DefaultLogo}
            className={classes.value} />
          : isAvatar
            ? <Avatar
              src={value}
              size={60} />
            : <img
              alt='logoImage'
              src={value || DefaultLogo}
              className={classes.value} />
      }
    </main>
  );
};

EditableImage.propTypes = {
  classes: PropTypes.object.isRequired
};

EditableImage.defaultProps = {
  isEdit: false,
  isAvatar: true,
  label: '',
  value: '',
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableImage);
