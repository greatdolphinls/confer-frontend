
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';

import { setUserRecommends } from '../../../../actions';
import { PrimaryButton } from '../../../../components';

const styles = theme => {
  return {
    paper: {
      backgroundColor: theme.palette.mainBackColor
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
      fontSize: 34,
      fontWeight: 500,
      marginBottom: theme.spacing(3.5)
    },
    description: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: theme.spacing(3.5)
    }
  };
};

const SuccessRecommendModal = ({
  classes, opened, minCandidates, keepContent, passContent, onClose, onConfirm
}) => {

  const recommends = useSelector(state => state.recommend.user, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, description, confirm } = recommends.length < minCandidates ? keepContent : passContent;

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
          {title}
        </Typography>
        <Typography className={classes.description}>
          {description}
        </Typography>
        <PrimaryButton onClick={onConfirm}>
          {confirm}
        </PrimaryButton>
      </DialogContent>
    </Dialog>
  );
};

SuccessRecommendModal.propTypes = {
  classes: PropTypes.object.isRequired,
  minCandidates: PropTypes.number,
  onConfirm: PropTypes.func.isRequired
};

SuccessRecommendModal.defaultProps = {
  opened: false,
  minCandidates: 3,
  onClose: () => { },
  onConfirm: () => { },
  keepContent: {
    title: 'Thank you!',
    description: 'Awesome, your recommendation has been added. You’ve just helped advance someone’s career in a big way!',
    confirm: 'Keep Up the good work'
  },
  passContent: {
    title: 'Thank you!',
    description: 'Thanks for submitting your three recommendations. You can now start searching for talent. You can add more recommendations at any time, up to 5 total!',
    confirm: 'Discover Talent'
  }
};

export default withStyles(styles, { withTheme: true })(SuccessRecommendModal);
