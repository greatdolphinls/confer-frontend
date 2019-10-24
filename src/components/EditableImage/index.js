
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone';

import * as UPLOAD_SERVICE from '../../services/upload';
import Avatar from '../Avatar';
import DefaultLogo from '../../assets/img/defaultLogo.jpg';
import { defaultAvatarLink as DefaultAvatar } from '../../constants/links';

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
      width: 120,
      height: 60,
      objectFit: 'cover',
      borderRadius: 2
    },
    upload: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px dashed ${theme.palette.borderColor}`,
      margin: `${theme.spacing(1)}px  0`,
      width: 150,
      height: 150,
      borderRadius: 3,
    },
    editableImage: {
      width: 100,
      height: 100,
      objectFit: 'cover',
      borderRadius: 2
    }
  };
};

const EditableImage = ({
  classes, isEdit, isAvatar, label, value, onChange
}) => {

  const onUploadHandler = async (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async () => {
      const data = {
        folder: isAvatar ? 'avatar' : 'logo',
        file: reader.result
      }
      const response = await UPLOAD_SERVICE.uploadImage(data);
      onChange(response.data);
    });
    reader.readAsDataURL(file);
  }

  const imageUploadRender = () => {
    const DefaultImage = isAvatar ? DefaultAvatar : DefaultLogo;

    return (
      <Dropzone onDrop={onUploadHandler}>
        {({ getRootProps, getInputProps }) => {
          const inputProps = getInputProps()
          const rootProps = getRootProps()
          return (
            <div {...rootProps}
              className={classes.upload}
            >
              <img
                alt='logoImage'
                src={value || DefaultImage}
                className={classes.editableImage} />
              <input {...inputProps} />
            </div>
          )
        }}
      </Dropzone>
    )
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
          ? imageUploadRender()
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
