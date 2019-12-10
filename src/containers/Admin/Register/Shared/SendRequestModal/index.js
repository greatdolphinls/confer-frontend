
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { PrimaryButton, CustomSelectValidator } from '../../../../../components';
import { useInput } from '../../../../../utils/hooks';

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
    input: {
      width: '100%'
    }
  };
};

const SendRequestModal = ({ classes, opened, groups, onClose, onConfirm }) => {
  const groupId = useInput('');

  const submitHandler = () => {
    onConfirm(groupId.value)
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
        Send Request
      </DialogTitle>
      <DialogContent className={classes.content}>
        <ValidatorForm
          onSubmit={submitHandler}
          onError={errors => console.log(errors)}>
          <CustomSelectValidator
            fullWidth
            label='Group'
            classes={{ root: classes.input }}
            value={groupId.value}
            changed={groupId.onChange}
            items={groups} />
          <DialogActions>
            <PrimaryButton
              type='submit'>
              Send
            </PrimaryButton>
            <PrimaryButton
              onClick={onClose}>
              Cancel
          </PrimaryButton>
          </DialogActions>
        </ValidatorForm>
      </DialogContent>
    </Dialog>
  );
};

SendRequestModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

SendRequestModal.defaultProps = {
  opened: false,
  onClose: () => { }
};

export default withStyles(styles, { withTheme: true })(SendRequestModal);
