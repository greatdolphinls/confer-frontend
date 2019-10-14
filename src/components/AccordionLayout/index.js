
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EditIconButton, CloseIconButton } from '../';

const styles = theme => {
  return {
    root: {
      boxShadow: 'unset',
      margin: `${theme.spacing(4)}px 0`
    },
    header: {
      backgroundColor: theme.palette.subBackColor6
    },
    heading: {
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      padding: `${theme.spacing(3)}px 0`
    },
    icon: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  };
};

const AccordionLayout = ({ classes, title, panel, selectedPanel, isEdit, onExpand, onEdit, children }) => {

  const handleChange = (event, isExpanded) => {
    onExpand(isExpanded ? panel : false);
  }

  const editHandler = () => {
    onEdit(isEdit ? false : panel);
  }

  return (
    <ExpansionPanel
      expanded={selectedPanel === panel}
      onChange={handleChange}
      className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.header}>
        <Typography className={classes.heading}>
          {title}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.content}>
        {
          isEdit
            ? <CloseIconButton
              onClick={editHandler}
              classes={{ root: classes.icon }} />
            : <EditIconButton
              onClick={editHandler}
              classes={{ root: classes.icon }} />
        }
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

AccordionLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AccordionLayout);
