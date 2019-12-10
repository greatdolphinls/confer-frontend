
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import { CandidatePhoto, CandidateSnapshot } from '../../../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.25)',
      backgroundColor: theme.palette.lightBrownBackColor,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    candidateSnapshot: {
      marginLeft: theme.spacing(2),
      paddingBottom: 0,
      maxWidth: 320
    },
    isFetching: {
      opacity: 0.03
    }
  };
};

const PreviewProfileCard = ({ classes, isFetching, candidate }) => {
  return (
    <Paper className={classNames(classes.root, { [classes.isFetching]: isFetching })}>
      <CandidatePhoto
        isSmall={true}
        candidate={candidate}
        classes={{ root: classes.candidatePhoto }} />
      <CandidateSnapshot
        isSmall={true}
        candidate={candidate}
        classes={{ root: classes.candidateSnapshot }} />
    </Paper>
  );
};

PreviewProfileCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PreviewProfileCard);
