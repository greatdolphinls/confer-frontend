
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { CloseIconButton } from '../../../../components';

const styles = theme => {
  return {
    paper: {
      backgroundColor: theme.palette.mainBackColor
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
      padding: theme.spacing(6),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      }
    },
    title: {
      fontWeight: 'bold',
      marginTop: theme.spacing(4)
    },
    description: {
      fontSize: 14,
      marginTop: theme.spacing(2.5)
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
        {onClose &&
          <CloseIconButton
            classes={{ root: classes.closeButton }}
            onClick={onClose}
          />
        }
        <Typography className={classes.title}>
          We get it. It’s hard to narrow down everyone you’ve ever
          worked with to three outstanding people. Here are some
          examples to get you started:
        </Typography>
        <Typography className={classes.description}>
          -An analyst who worked for you for 3 projects and exhibited
          strong attention to detail, excellent communication skills,
          and stood out for her commitment to training other analysts
          on the team
        </Typography>
        <Typography className={classes.description}>
          -A partner at a vendor you work with who consistently responds
          to your questions and expertly works within his organization
          to resolve any issues.
        </Typography>
        <Typography className={classes.description}>
          -Your former manager who trained and mentored you and other
          reports but hasn’t received the recognition she deserves
          within her organization.
        </Typography>
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
