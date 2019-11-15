
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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

const AddRequestModal = ({ classes, opened, groups, onClose, onConfirm }) => {
  const groupId = useInput('');
  const email = useInput('');

  const submitHandler = () => {
    const register = {
      email: email.value,
      groupId: groupId.value
    }
    onConfirm(register)
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
        Add New Request
      </DialogTitle>
      <DialogContent className={classes.content}>
        <ValidatorForm
          onSubmit={submitHandler}
          onError={errors => console.log(errors)}>
          <TextValidator
            fullWidth
            name='email'
            label='Email Address'
            className={classes.input}
            value={email.value}
            onChange={email.onChange}
            validators={['isEmail', 'required']}
            errorMessages={['Email is not valid', 'Email cannot be empty']} />
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

AddRequestModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

AddRequestModal.defaultProps = {
  opened: false,
  onClose: () => { }
};

export default withStyles(styles, { withTheme: true })(AddRequestModal);
