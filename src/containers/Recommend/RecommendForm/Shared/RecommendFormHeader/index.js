
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { BackButton } from '../../../../../components';
import { pageLinks } from '../../../../../constants/links';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: `${theme.spacing(5)}px 0`
    },
    title: {
      fontSize: 60,
      fontFamily: 'Ogg',
      [theme.breakpoints.down('sm')]: {
        fontSize: 36
      }
    },
    description: {
      width: 660,
      fontSize: 20,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  };
};

const RecommendFormHeader = ({ classes, history }) => {

  const backButtonHandler = () => {
    history.push(pageLinks.GroundRules.url);
  }

  return (
    <main className={classes.root}>
      <BackButton
        label='see how it works'
        onBack={backButtonHandler}
      />
      <Typography className={classes.title}>
        Time to pay it forward.
      </Typography>
      <Typography className={classes.description}>
        Just fill in the blanks. Or, if you’d rather
        talk through this directly, give us a call
        at <u>646-389-5352</u>.
      </Typography>
    </main>
  );
};

RecommendFormHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RecommendFormHeader);
