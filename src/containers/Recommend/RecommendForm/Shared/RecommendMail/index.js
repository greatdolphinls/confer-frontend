
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { OutlineButton } from '../../../../../components';
import { showInfoToast } from '../../../../../utils/utility';

const styles = theme => {
  return {
    root: {
      width: 720,
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    mainDescription: {
      fontSize: 18,
      marginBottom: theme.spacing(2)
    },
    container: {
      marginLeft: theme.spacing(10),
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0
      }
    },
    subDescription: {
      fontSize: 14,
      opacity: 0.6,
      marginBottom: theme.spacing(1)
    },
    button: {
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0.6
    }
  };
};

const RecommendMail = ({ classes, mail }) => {

  const copyButtonHandler = () => {
    showInfoToast('copied');
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.mainDescription}>
        <b>We’ll invite the person you’ve recommended to
            opt in to emails and edit their profile. </b>
        We’ll include your name in our invitation since we
        believe transparency is important to building trust.
        Want to give them a heads up? We’ll wait 24 hours
        before inviting them. Here’s a text or email you can
        share with them if you’d like:
      </Typography>
      <div className={classes.container}>
        <Typography className={classes.subDescription}>
          {mail}
        </Typography>
        <CopyToClipboard
          text={mail}
          onCopy={copyButtonHandler}>
          <OutlineButton
            classes={{ root: classes.button }} >
            Copy Text
          </OutlineButton>
        </CopyToClipboard>
      </div>
    </main>
  );
};

RecommendMail.propTypes = {
  classes: PropTypes.object.isRequired
};

RecommendMail.defaultProps = {
  mail: `“Hi {Name} - Just want to give you a heads up that 
  I recommended you for Merit, indicating that you're among 
  the best people I've ever worked with! Merit is a platform 
  powered by professional recommendations so you can make 
  great connections and hear about new opportunities. 
  Merit will be in touch so you can learn more!”`
};

export default withStyles(styles, { withTheme: true })(RecommendMail);
