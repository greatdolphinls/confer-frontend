
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';

import * as UPLOAD_SERVICE from '../../../services/upload';
import { setLoadingStatus } from '../../../actions'
import { Avatar, RemoveIconButton } from '../..';
import DefaultLogo from '../../../assets/img/defaultLogo.jpg';
import { defaultAvatarLink as DefaultAvatar } from '../../../constants/links';
import { getAvatarWithName } from '../../../utils/utility';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
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
    uploadContainer: {
      position: 'relative'
    },
    upload: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px dashed ${theme.palette.borderColor}`,
      margin: `${theme.spacing(1)}px  0`,
      width: 130,
      height: 130,
      borderRadius: 3,
    },
    editableImage: {
      width: 100,
      height: 100,
      objectFit: 'cover',
      borderRadius: 2
    },
    avatar: {
      borderRadius: '50%'
    },
    removeButton: {
      bottom: 0,
      right: 0,
      position: 'absolute',
      color: theme.palette.darkGreyButtonColor
    }
  };
};

const EditableImage = ({
  classes, isEdit, isAvatar, label, value, onChange, firstName, lastName
}) => {
  const dispatch = useDispatch();

  const onUploadHandler = async (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async () => {
      await dispatch(setLoadingStatus({ loading: true }));
      const data = {
        folder: isAvatar ? 'avatar' : 'logo',
        file: reader.result
      }
      const response = await UPLOAD_SERVICE.uploadImage(data);
      onChange(response.data);
      await dispatch(setLoadingStatus({ loading: false }));
    });
    reader.readAsDataURL(file);
  }

  const removeButtonHandler = () => {
    if (isAvatar) {
      onChange(getAvatarWithName(firstName, lastName))
    }
  }

  const imageUploadRender = () => {
    const DefaultImage = isAvatar ? DefaultAvatar : DefaultLogo;

    return <div className={classes.uploadContainer}>
      <Dropzone onDrop={onUploadHandler}>
        {({ getRootProps, getInputProps }) => {
          const inputProps = getInputProps()
          const rootProps = getRootProps()
          return (
            <div {...rootProps}
              className={classNames(classes.upload, { [classes.avatar]: isAvatar })}
            >
              <img
                alt='logoImage'
                src={value || DefaultImage}
                className={classNames(classes.editableImage, { [classes.avatar]: isAvatar })} />
              <input {...inputProps} />
            </div>
          )
        }}
      </Dropzone>
      {
        isAvatar &&
        <RemoveIconButton
          onClick={removeButtonHandler}
          classes={{ root: classes.removeButton }} />
      }
    </div>
  }

  return (
    <main className={classes.root}>
      {
        !!label &&
        <Typography
          className={classes.label}
        >
          {`${label}:`}
        </Typography>
      }
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
  firstName: 'A',
  lastName: 'B',
  onChange: () => { }
};

export default withStyles(styles, { withTheme: true })(EditableImage);
