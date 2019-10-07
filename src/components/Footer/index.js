
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { pageLinks } from '../../constants/links'

const styles = theme => {
  return {
    root: {
      height: 59,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.palette.subBackColor
    },
    item: {
      textDecoration: 'none',
      fontSize: 16,
      color: theme.palette.mainForeColor
    }
  };
};

const Footer = ({ classes, items }) => {
  return (
    <div className={classes.root}>
      {items.map((item, index) => (
        <Link key={index} to={item.url} className={classes.item}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

Footer.defaultProps = {
  items: [
    {
      title: pageLinks.ContactUs.title,
      url: pageLinks.ContactUs.url
    },
    {
      title: pageLinks.TermsOfUse.title,
      url: pageLinks.TermsOfUse.url
    },
    {
      title: pageLinks.PrivacyPolicy.title,
      url: pageLinks.PrivacyPolicy.url
    },
    {
      title: pageLinks.FAQ.title,
      url: pageLinks.FAQ.url
    }
  ]
};

export default withStyles(styles, { withTheme: true })(Footer);
