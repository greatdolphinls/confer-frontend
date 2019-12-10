import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import * as REGISTER_SERVICE from '../../../services/register';
import notifications from '../../../constants/notifications'
import { showErrorToast, showInfoToast } from '../../../utils/utility';
import { GroupCarousel } from '../../../components';
import {
  StandardHomeHeader,
  StandardHomeTalent,
  StandardHowItWorks,
  StandardHomeDiscover
} from './Shared';
import { HomeKnowGreat } from '../Shared';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `${theme.spacing(6)}px 0`
    }
  };
};

const StandardHome = ({ classes }) => {
  const sendEmailHandler = async (email) => {
    try {
      const data = {
        email
      }
      await REGISTER_SERVICE.addRegister(data);
      await showInfoToast(notifications.HOME_REQUEST_EMAIL_SUCCESS)
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        showErrorToast(message);
      } else {
        showErrorToast(notifications.HOME_REQUEST_EMAIL_ERROR)
      }
    }
  }

  return (
    <main className={classes.root}>
      <StandardHomeHeader
        onConfirm={sendEmailHandler} />
      <StandardHomeTalent />
      <GroupCarousel />
      <StandardHowItWorks />
      <StandardHomeDiscover />
      <HomeKnowGreat
        onConfirm={sendEmailHandler} />
    </main>
  );
};

StandardHome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StandardHome);
