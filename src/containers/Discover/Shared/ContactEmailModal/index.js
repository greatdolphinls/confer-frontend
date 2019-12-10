
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import notifications from '../../../../constants/notifications';
import { PrimaryButton, CloseIconButton } from '../../../../components';
import { useInput } from '../../../../utils/hooks';
import { isEmpty, showErrorToast } from '../../../../utils/utility';

const styles = theme => {
  return {
    paper: {
      backgroundColor: theme.palette.brownBackColor,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: `${theme.spacing(2)}px !important`
      }
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.darkGreyButtonColor,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(5)}px ${theme.spacing(7)}px ${theme.spacing(2.5)}px `,
      [theme.breakpoints.down('xs')]: {
        padding: `${theme.spacing(2)}px !important`,
      }
    },
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
      padding: `0 ${theme.spacing(1)}px`,
      marginBottom: theme.spacing(2)
    },
    textField: {
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

const ContactEmailModal = ({ classes, opened, candidateName, referrerName, onClose, onConfirm }) => {
  const { user } = useSelector(state => state.auth, []);
  const message = useInput('');

  const { firstName, lastName } = user;
  useEffect(() => {
    let defaultMessage = `Hi ${candidateName} - \n\n\n`;
    defaultMessage += `I’m ${firstName} ${lastName} and I’m looking to add a new person to our team. I love your background and you come highly recommended by ${referrerName}, so I thought I’d reach out to see if you’d like to hear more about what we’re working on here.\n\n`
    defaultMessage += `Best, \n${firstName} ${lastName}`;

    message.onSet(defaultMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const sendHandler = () => {
    if (isEmpty(message.value)) {
      showErrorToast(notifications.CONTACT_EMPTY_MESSAGE_ERROR)
      return null;
    }
    onConfirm(message.value);
  }

  return (
    <Dialog
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      classes={{ paper: classes.paper }}
      open={opened}
      aria-labelledby='form-dialog-title'>
      <DialogTitle>
        {onClose &&
          <CloseIconButton
            classes={{ root: classes.closeButton }}
            onClick={onClose}
          />
        }
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography className={classes.title}>
          We’ll email {candidateName} directly with your note below.
          If she’s interested in connecting, we’ll put you in touch!
        </Typography>
        <TextField
          fullWidth
          rows='12'
          multiline
          margin='normal'
          className={classes.textField}
          defaultValue={message.value}
          onChange={message.onChange}
          inputProps={{ 'aria-label': 'bare' }}
        />
        <PrimaryButton onClick={sendHandler}>
          Send Message
        </PrimaryButton>
      </DialogContent>
    </Dialog>
  );
};

ContactEmailModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired
};

ContactEmailModal.defaultProps = {
  opened: false,
  onClose: () => { },
  onConfirm: () => { },
};

export default withStyles(styles, { withTheme: true })(ContactEmailModal);
