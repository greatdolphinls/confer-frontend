import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { BackButton, PrimaryButton } from '../../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2)
    }
  };
};

const EditControlButtons = ({ classes, backLabel, onBack, onSave }) => {

  return (
    <main className={classes.root}>
      <BackButton
        label={backLabel}
        onBack={onBack}
      />
      <PrimaryButton onClick={onSave}>
        Update
      </PrimaryButton>
    </main>
  );
};

EditControlButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

EditControlButtons.defaultProps = {
  label: 'Back',
  onBack: () => { },
  onSave: () => { }
};

export default withStyles(styles)(EditControlButtons);
