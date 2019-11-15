import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { BackButton, PrimaryButton } from '../../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      }
    },
    controlButtons: {
      display: 'flex',
      width: 280,
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginTop: theme.spacing(3)
      }
    },
    backButton: {
      fontSize: 24
    },
    saveButton: {
      width: 134
    },
    deleteButton: {
      width: 134,
      color: theme.palette.whiteColor,
      backgroundColor: theme.palette.darkGreyButtonColor
    },
  };
};

const ControlButtons = ({ classes, backLabel, onBack, onSave, onDelete }) => {

  return (
    <main className={classes.root}>
      <BackButton
        label={backLabel}
        onBack={onBack}
        classes={{ root: classes.backButton }}
      />
      <div className={classes.controlButtons}>
        <PrimaryButton
          onClick={onSave}
          classes={{ root: classes.saveButton }}>
          Save
        </PrimaryButton>
        <PrimaryButton
          onClick={onDelete}
          classes={{ root: classes.deleteButton }}>
          Delete
        </PrimaryButton>
      </div>
    </main>
  );
};

ControlButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

ControlButtons.defaultProps = {
  label: 'Back',
  onBack: () => { },
  onSave: () => { },
  onDelete: () => { }
};

export default withStyles(styles)(ControlButtons);
