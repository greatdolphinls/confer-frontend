import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { pageLinks } from '../../../../constants/links';

const AntTabs = withStyles(theme => ({
  indicator: {
    backgroundColor: theme.palette.buttonColor,
  },
}))(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    fontSize: 24,
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(5),
    padding: 0,
    '&:hover': {
      color: theme.palette.buttonColor,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.buttonColor,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.buttonColor,
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const styles = theme => {
  return {
    root: {}
  };
};

const AdminTabs = ({ classes, selectedValue, tabs, history }) => {

  const handleChange = (event, newValue) => {
    if (newValue === 'users') {
      history.push(pageLinks.AdminUserList.url);
    } else {
      history.push(pageLinks.AdminGroupList.url);
    }
  };

  return (
    <AntTabs
      value={selectedValue}
      onChange={handleChange}
      aria-label="admin tabs">
      {tabs.map(({ label, value }) => (
        <AntTab
          key={value}
          label={label}
          value={value} />
      ))}
    </AntTabs>
  );
};

AdminTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

AdminTabs.defaultProps = {
  tabs: [
    {
      label: 'Users',
      value: 'users'
    },
    {
      label: 'Groups',
      value: 'groups'
    },
  ]
};

export default withStyles(styles)(AdminTabs);
