import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { HomeEmailInput, HomeButton } from '../';
import { useInput } from '../../../../utils/hooks';

const styles = theme => {
  return {
    root: {
      width: 430,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: `${theme.spacing(5)}px 0`,
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    title: {
      fontSize: 52,
      fontFamily: 'Ogg',
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 32,
        lineHeight: '45px'
      }
    },
    description: {
      fontSize: 20,
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
        width: '100%'
      }
    }
  };
};

const HomeHeader = ({ classes, title, description, button, onConfirm }) => {
  const email = useInput('');

  const requestHandler = () => {
    onConfirm(email.value);
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        {title}
      </Typography>
      <Typography className={classes.description}>
        {description}
      </Typography>
      <ValidatorForm
        className={classes.form}
        onSubmit={requestHandler}
        onError={errors => console.log(errors)}>
        <HomeEmailInput
          name='email'
          value={email.value}
          onChange={email.onChange}
        />
        <HomeButton
          type='submit'
          name={button}
        />
      </ValidatorForm>
    </main>
  );
};

HomeHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

HomeHeader.defaultProps = {
  title: 'Let talent recognize talent.',
  description: `Stop sifting through resumes and 
  discover top talent recommended by your peers.`,
  button: 'REQUEST TO RECOMMEND',
  onConfirm: () => { }
};

export default withStyles(styles)(HomeHeader);
