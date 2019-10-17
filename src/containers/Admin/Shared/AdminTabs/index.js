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
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      minWidth: 72,
      marginRight: theme.spacing(2),
    }
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
    switch (newValue) {
      case 'users':
        history.push(pageLinks.AdminUserList.url);
        break
      case 'groups':
        history.push(pageLinks.AdminGroupList.url);
        break
      case 'recommends':
        history.push(pageLinks.AdminRecommendList.url);
        break
      default:
        break
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
    {
      label: 'Recommends',
      value: 'recommends'
    }
  ]
};

export default withStyles(styles)(AdminTabs);
