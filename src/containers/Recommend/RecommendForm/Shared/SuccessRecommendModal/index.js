
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { roles } from '../../../../../constants/roles';
import { setUserRecommends } from '../../../../../actions';
import { PrimaryButton } from '../../../../../components';

const styles = theme => {
  return {
    paper: {
      borderRadius: 10,
      backgroundColor: theme.palette.brownBackColor
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(6)}px ${theme.spacing(5)}px !important`,
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      }
    },
    title: {
      fontSize: 34,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: theme.spacing(1)
    },
    description: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: theme.spacing(3)
    }
  };
};

const SuccessRecommendModal = ({
  classes, opened, minCandidates, initContent, keepContent, referrerPassContent, weakPassContent, onClose, onConfirm
}) => {
  const { user } = useSelector(state => state.auth, []);
  const recommends = useSelector(state => state.recommend.user, []);
  const dispatch = useDispatch();

  const [content, setContent] = useState(initContent);
  const [initCall, setInitCall] = useState(false);

  useEffect(() => {
    dispatch(setUserRecommends());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initCall) {
      const isWeakUser = user.role === roles.WEAK_ROLE;
      const data = recommends.length < minCandidates
        ? keepContent
        : isWeakUser
          ? weakPassContent
          : referrerPassContent;
      setContent(data);
    } else {
      setInitCall(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommends]);

  const { title, description, confirm } = content;

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
  initContent: {
    title: '',
    description: '',
    confirm: ''
  },
  keepContent: {
    title: 'Thank you!',
    description: `Awesome, your recommendation has been added. 
    You’ve just helped advance someone’s career in a big way!`,
    confirm: 'Keep going'
  },
  referrerPassContent: {
    title: 'Thank you!',
    description: `Thank you for submitting your three 
    recommendations and helping to advance their careers! 
    As soon as we’re done reviewing your recommendations, 
    you’ll get to start discovering talent. In the meantime, 
    you can recommend up to two more people.  
    We’ll be in touch shortly!`,
    confirm: 'CONTINUE'
  },
  weakPassContent: {
    title: 'Thank you!',
    description: `Thank you for making three recommendations!
    We'll notify you as soon as we're done reviewing them. 
    Once your recommendations are accepted, we will email 
    your reward to your inbox. In the meantime, you can 
    recommend up to two more people if you’d like. We'll 
    be in touch shortly!`,
    confirm: 'CONTINUE'
  }
};

export default withStyles(styles, { withTheme: true })(SuccessRecommendModal);
