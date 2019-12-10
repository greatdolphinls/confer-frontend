import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { ValidatorForm } from 'react-material-ui-form-validator';

import { HomeEmailInput, HomeButton } from '..';
import { useInput } from '../../../../utils/hooks';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 6,
      backgroundColor: theme.palette.lightBrownBackColor,
      margin: `${theme.spacing(4)}px 0`,
      padding: theme.spacing(6),
      [theme.breakpoints.down('xs')]: {
        margin: `${theme.spacing(2)}px 0`,
        padding: theme.spacing(3)
      }
    },
    title: {
      fontSize: 20,
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        fontSize: 18
      }
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    }
  };
};

const HomeKnowGreat = ({ classes, title, button, onConfirm }) => {
  const email = useInput('');

  const requestHandler = () => {
    onConfirm(email.value);
  }

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        {title}
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
    </main >
  );
};

HomeKnowGreat.propTypes = {
  classes: PropTypes.object.isRequired
};

HomeKnowGreat.defaultProps = {
  title: 'KNOW SOMEONE GREAT?',
  button: 'SIGN UP TO RECOMMEND THEM',
  onConfirm: () => { }
};

export default withStyles(styles)(HomeKnowGreat);
