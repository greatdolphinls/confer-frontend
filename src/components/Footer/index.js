
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import { pageLinks } from '../../constants/links';

const styles = theme => {
  return {
    root: {
      backgroundColor: theme.palette.sandBackColor
    },
    container: {
      height: 59,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 920
      },
      [theme.breakpoints.up('lg')]: {
        width: 1170
      },
      [theme.breakpoints.up('xl')]: {
        width: 1366
      }
    },
    item: {
      textDecoration: 'none',
      fontSize: 16,
      color: theme.palette.mainForeColor,
      [theme.breakpoints.down('xs')]: {
        fontSize: 14
      }
    }
  };
};

const Footer = ({ classes, items }) => {
  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <a
          key='contactUs'
          href={pageLinks.ContactUs.url}
          className={classes.item}>
          {pageLinks.ContactUs.title}
        </a>
        {items.map((item, index) => (
          <Link key={index} to={item.url} className={classes.item}>
            {item.title}
          </Link>
        ))}
      </div>
    </main>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

Footer.defaultProps = {
  items: [
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
