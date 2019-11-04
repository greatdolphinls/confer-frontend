import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(8),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
      }
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(3)
      }
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        fontSize: 36
      }
    },
    mainDescription: {
      fontSize: 22,
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
      }
    },
    containerTitle: {
      fontSize: 30,
      fontFamily: 'Moret-Bold',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        fontSize: 24
      }
    }
  };
};

const PrivacyPolicy = ({ classes }) => {

  const headerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.mainDescription}>
          Thank you for choosing to be part of our community
          at Gratitude Software, Inc., doing business as Merit
          (“<b>Merit</b>”, “<b>we</b>”, “<b>us</b>”, or “<b>our</b>”).
          We are committed to protecting your personal information
          and your right to privacy. If you have any questions
          or concerns about our policy, or our practices with
          regards to your personal information, please contact
          us at contact@hellomerit.com.
        </Typography>
        <Typography className={classes.mainDescription}>
          When you visit our website http://hellomerit.com, and use
          our services, you trust us with your personal information.
          We take your privacy very seriously. In this privacy policy,
          we seek to explain to you in the clearest way possible what
          information we collect, how we use it and what rights you
          have in relation to it. We hope you take some time to read
          through it carefully, as it is important. If there are any
          terms in this privacy policy that you do not agree with,
          please discontinue use of our Sites and our services.
        </Typography>
        <Typography className={classes.mainDescription}>
          This privacy policy applies to all information collected
          through our website (such as http://hellomerit.com), and/or
          any related services, sales, marketing or events (we refer
          to them collectively in this privacy policy as the <b>"Services"</b>).
        </Typography>
        <Typography className={classes.mainDescription}>
          <b>
            Please read this privacy policy carefully as it will help
            you make informed decisions about sharing your personal
            information with us.
          </b>
        </Typography>
      </div>
    )
  }

  const oneContainerRender = () => {
    return (
      <div className={classes.container}>
        <Typography className={classes.containerTitle}>
          1. WHAT INFORMATION DO WE COLLECT?
        </Typography>
      </div>
    )
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        Merit Privacy Policy
      </Typography>
      {headerRender()}
      {oneContainerRender()}
    </main>
  );
};

PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrivacyPolicy);
