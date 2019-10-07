
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { PrimaryButton } from '../../../../components';

const styles = theme => {
  return {
    paper: {
      backgroundColor: theme.palette.mainBackColor
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.subButtonColor1,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(5)}px ${theme.spacing(7)}px ${theme.spacing(2.5)}px `,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      }
    },
    title: {
      fontWeight: 'bold',
      padding: `0 ${theme.spacing(1.5)}px`,
      marginBottom: theme.spacing(3.5)
    },
    description: {
      fontSize: 14,
      padding: theme.spacing(1.5),
      marginBottom: theme.spacing(3.5),
      border: `1px solid #E5E5E5`,
      borderRadius: 4
    }
  };
};

const ContactEmailModal = ({ classes, opened, candidateName, referrerName, onClose, onConfirm }) => {
  const { user: { firstName, lastName } } = useSelector(state => state.auth, []);

  return (
    <Dialog
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      classes={{ paper: classes.paper }}
      open={opened}
      aria-labelledby='form-dialog-title'>

      <DialogContent className={classes.content}>
        <Typography className={classes.title}>
          We’ll email {candidateName} directly with your note below.
          If she’s interested in connecting, we’ll put both of you in touch!
          {onClose ? (
            <IconButton className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </Typography>
        <Typography className={classes.description}>
          Hi {candidateName} -
          <br /> <br /> <br />
          I’m {`${firstName} ${lastName}`} and I’m looking to add a new person to our team.
          I love your background and you come highly recommended by {referrerName},
          so I thought I’d reach out to see if you’d like to hear more about
          what we’re working on here.
          <br /> <br />
          Best,
          <br />
          {`${firstName} ${lastName}`}
        </Typography>
        <PrimaryButton onClick={onConfirm}>
          send email
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
