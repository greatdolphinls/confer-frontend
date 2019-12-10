import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import SendEmailIcon from '../../../../assets/img/icons/send-email-icon.svg';

const styles = theme => {
  return {
    root: {
      fontSize: 10,
      marginTop: theme.spacing(1),
      padding: theme.spacing(0.5),
    },
    sendEmailIcon: {
      marginLeft: theme.spacing(1)
    }
  };
};

const HomeButton = ({ classes, name, ...props }) => {
  return (
    <Button
      className={classes.root}
      {...props}>
      {name}
      <img
        src={SendEmailIcon}
        className={classes.sendEmailIcon}
        alt='SendEmailIcon' />
    </Button>
  );
};

HomeButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeButton);
