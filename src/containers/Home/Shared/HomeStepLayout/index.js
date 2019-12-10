import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing(8),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    container: {
      width: '45%',
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      }
    },
    step: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      fontSize: 20,
      fontWeight: 'bold',
      border: `1px solid`,
      borderRadius: '50%',
      color: theme.palette.buttonColor,
      borderColor: theme.palette.buttonColor,
      [theme.breakpoints.down('xs')]: {
        height: 35,
        width: 35,
        fontSize: 16
      }
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(2)
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        fontSize: 22
      }
    },
    description: {
      fontSize: 25,
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        fontSize: 16
      }
    },
    image: {
      width: '50%',
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
    }
  };
};

const HomeStepLayout = ({ classes, step }) => {
  const { no, title, descriptions, image } = step;
  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <div>
          <Typography className={classes.step}>
            {no}
          </Typography>
        </div>
        <div className={classes.contentContainer}>
          <Typography className={classes.title}>
            {title}
          </Typography>
          {
            descriptions.map((description, index) =>
              <Typography
                key={index}
                className={classes.description}>
                {description}
              </Typography>
            )
          }
        </div>
      </div>
      <img
        className={classes.image}
        alt='recommendImage'
        src={image} />
    </main >
  );
};

HomeStepLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeStepLayout);
