
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import withStyles from '@material-ui/core/styles/withStyles';

import { PrimaryButton } from '../index';

const styles = theme => {
  return {
    actions: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-around',
      padding: theme.spacing(1)
    },
    paper: {
      borderRadius: 3,
      padding: theme.spacing(3),
      width: '100%'
    },
    content: {
      padding: `${theme.spacing(3)}px 0`
    },
    text: {
      fontSize: 20,
      fontWeight: 500,
      color: theme.palette.mainForeColor,
      textAlign: 'center'
    },
    cancelButton: {
      width: 134,
      backgroundColor: theme.palette.borderColor
    },
    confirmButton: {
      width: 134
    }
  };
};

const ConfirmDialog = ({
  classes, confirmText, cancelLabel, confirmLabel, opened, onClose, onConfirm
}) => {
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={opened}
      onClose={onClose}
      fullWidth
      maxWidth='xs'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogContent className={classes.content}>
        <DialogContentText
          className={classes.text}>
          {confirmText}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <PrimaryButton
          classes={{ root: classes.cancelButton }}
          onClick={onClose}>
          {cancelLabel}
        </PrimaryButton>
        <PrimaryButton
          classes={{ root: classes.confirmButton }}
          onClick={onConfirm}
          autoFocus>
          {confirmLabel}
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string
};

ConfirmDialog.defaultProps = {
  confirmText: 'Are you sure you want to delete this entry?',
  cancelLabel: 'Cancel',
  confirmLabel: 'Delete'
};

export default withStyles(styles, { withTheme: true })(ConfirmDialog);
