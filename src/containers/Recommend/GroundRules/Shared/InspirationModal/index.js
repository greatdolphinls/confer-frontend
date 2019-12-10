
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { PrimaryButton } from '../../../../../components';

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
      alignItems: 'center',
      padding: `${theme.spacing(6)}px !important`,
      [theme.breakpoints.down('xs')]: {
        padding: `${theme.spacing(4)}px !important`
      }
    },
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(4)
    },
    description: {
      fontSize: 14,
      marginBottom: theme.spacing(2.5)
    }
  };
};

const InspirationModal = ({ classes, opened, onClose }) => {
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
          Here are some examples:
        </Typography>
        <Typography className={classes.description}>
          -An analyst who worked for you for 3 projects and
          exhibited strong attention to detail and excellent
          communication skills
        </Typography>
        <Typography className={classes.description}>
          -A vendor partner who who consistently responds
          to your questions and expertly works within their
          organization to resolve any issues
        </Typography>
        <Typography className={classes.description}>
          -Your former manager who trained and mentored
          you but hasn’t received the recognition she
          deserves within her organization
        </Typography>
        <PrimaryButton
          onClick={onClose}>
          GO BACK
        </PrimaryButton>
      </DialogContent>
    </Dialog>
  );
};

InspirationModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

InspirationModal.defaultProps = {
  opened: false,
  onClose: () => { }
};

export default withStyles(styles, { withTheme: true })(InspirationModal);
