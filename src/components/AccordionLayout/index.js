
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => {
  return {
    root: {
      boxShadow: 'unset',
      margin: `${theme.spacing(4)}px 0`
    },
    header: {
      backgroundColor: theme.palette.greyBackColor
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
    }
  };
};

const AccordionLayout = ({ classes, title, panel, selectedPanel, onExpand, children }) => {

  const handleChange = (event, isExpanded) => {
    onExpand(isExpanded ? panel : false);
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
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

AccordionLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AccordionLayout);
