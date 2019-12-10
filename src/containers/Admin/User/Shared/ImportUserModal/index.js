
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import UploadIcon from '@material-ui/icons/CloudUpload';
import FileIcon from '@material-ui/icons/Description';

import { PrimaryButton } from '../../../../../components';
import { useInput } from '../../../../../utils/hooks';
import { isEmpty } from '../../../../../utils/utility';

const styles = theme => {
  return {
    paper: {
      borderRadius: 10,
      backgroundColor: theme.palette.brownBackColor,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: `${theme.spacing(2)}px !important`
      }
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        padding: `${theme.spacing(4)}px !important`
      }
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    uploadContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      margin: `${theme.spacing(2)}px 0`,
      padding: theme.spacing(2),
      border: `1.5px dashed ${theme.palette.buttonColor}`
    },
    fileContent: {
      display: 'flex',
      alignItems: 'center',
      margin: `${theme.spacing(2)}px 0`,
      padding: theme.spacing(2),
      justifyContent: 'space-between',
      border: `1.5px dashed ${theme.palette.buttonColor}`
    },
    description: {
      '& span': {
        color: theme.palette.buttonColor,
        cursor: 'pointer'
      }
    },
    fileDescription: {
      display: 'flex'
    },
    removeButton: {
      cursor: 'pointer'
    }
  };
};

const ImportUserModal = ({ classes, opened, onClose, onConfirm }) => {
  const files = useInput([]);

  const confirmHandler = () => {
    const file = files.value[0];
    const reader = new FileReader();

    reader.addEventListener('load', async () => {
      const data = {
        file: reader.result
      }
      onConfirm(data);
    });
    reader.readAsBinaryString(file);
  }

  const removeHandler = () => {
    files.onSet([]);
  }

  return (
    <Dialog
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      classes={{ paper: classes.paper }}
      open={opened}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title' className={classes.title}>
        Import User CSV file
      </DialogTitle>
      <DialogContent className={classes.content}>
        {
          isEmpty(files.value) ?
            <Dropzone
              accept='.csv'
              onDrop={files.onChange}>
              {({ getRootProps, getInputProps }) => {
                const inputProps = getInputProps()
                const rootProps = getRootProps()
                return (
                  <div {...rootProps} className={classes.uploadContent}>
                    <UploadIcon />
                    <Typography className={classes.description}>
                      Drag csv file here or <span>browse</span> for csv file to upload
                    </Typography>
                    <input {...inputProps} />
                  </div>
                )
              }}
            </Dropzone> :
            <div className={classes.fileContent}>
              <Typography className={classes.fileDescription}>
                <FileIcon />
                {files.value[0].name}
              </Typography>
              <Typography
                onClick={removeHandler}
                className={classes.removeButton}>
                Remove
              </Typography>
            </div>
        }
        <DialogActions>
          <PrimaryButton
            disabled={isEmpty(files.value)}
            onClick={confirmHandler}>
            Upload
          </PrimaryButton>
          <PrimaryButton
            onClick={onClose}>
            Cancel
          </PrimaryButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ImportUserModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

ImportUserModal.defaultProps = {
  opened: false,
  onClose: () => { }
};

export default withStyles(styles, { withTheme: true })(ImportUserModal);
