
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { PrimaryButton } from '../../../../../components';
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
    description: {
      marginBottom: theme.spacing(2)
    },
    input: {
      fontSize: 14,
      padding: theme.spacing(1.5),
      marginBottom: theme.spacing(2),
      border: `1px solid ${theme.palette.buttonColor}`,
      borderRadius: 4,
      '& div:before': {
        borderWidth: '0 !important'
      },
      '& div:after': {
        borderWidth: '0 !important'
      }
    }
  };
};

const SendContactModal = ({ classes, opened, contact, onClose, onConfirm }) => {
  const { sender, candidate } = contact;
  const message = useInput('');

  useEffect(() => {
    message.onSet(contact.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = () => {
    const data = {
      ...contact,
      message: message.value
    }
    onConfirm(data);
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
        Send Contact
      </DialogTitle>
      <DialogContent className={classes.content}>
        <ValidatorForm
          onSubmit={submitHandler}
          onError={errors => console.log(errors)}>
          <Typography className={classes.description}>
            {`${sender.firstName} send this message to ${candidate.firstName}.`}
          </Typography>
          <TextValidator
            fullWidth
            rows='12'
            multiline
            name='message'
            className={classes.input}
            value={message.value}
            onChange={message.onChange}
            validators={['required']}
            errorMessages={['Message cannot be empty']} />
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

SendContactModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

SendContactModal.defaultProps = {
  opened: false,
  onClose: () => { }
};

export default withStyles(styles, { withTheme: true })(SendContactModal);
