
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { OutlineButton } from '../../../../../components';
import EnvelopImage from '../../../../../assets/img/icons/envelop.svg'
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
    mainContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(2)
    },
    envelopImage: {
      marginRight: theme.spacing(1)
    },
    subContainer: {
      margin: `0 ${theme.spacing(10)}px`,
      [theme.breakpoints.down('xs')]: {
        margin: 0
      }
    },
    subDescription: {
      fontSize: 14,
      marginBottom: theme.spacing(1),
      color: theme.palette.craneForeColor
    },
    button: {
      color: theme.palette.craneForeColor,
      borderColor: theme.palette.craneForeColor
    }
  };
};

const RecommendMail = ({ classes, mail }) => {
  
  const copyButtonHandler = () => {
    showInfoToast('copied');
    navigator.clipboard.writeText(mail);
  }

  return (
    <main className={classes.root}>
      <div className={classes.mainContainer}>
        <img
          className={classes.envelopImage}
          src={EnvelopImage}
          alt='EnvelopImage'/>
        <Typography className={classes.mainDescription}>
          <b>We’ll invite the person you’ve recommended to 
            opt in to emails and edit their profile. </b> 
          We’ll include your name in our invitation since we 
          believe transparency is important to building trust. 
          Want to give them a heads up? We’ll wait 24 hours 
          before inviting them. Here’s a txt or email you can 
          share with them if you’d like:
        </Typography>
      </div>
      <div className={classes.subContainer}>
        <Typography className={classes.subDescription}>
          {mail}
        </Typography>
        <OutlineButton
          classes={{root: classes.button}}
          onClick={copyButtonHandler}
        >
          Copy Text
        </OutlineButton>
      </div>
    </main>
  );
};

RecommendMail.propTypes = {
  classes: PropTypes.object.isRequired
};

RecommendMail.defaultProps = {
  mail: ` “Hi {Name} - Just want to give you a heads up that 
  I recommended you for Confer. Confer is sourcing 
  recommendations from professionals for the best 
  people they’ve ever worked with, and you fall into 
  that camp! Confer will reach out so you can learn 
  more what being a part of it entails. Thanks - and congrats!”`
};

export default withStyles(styles, { withTheme: true })(RecommendMail);
