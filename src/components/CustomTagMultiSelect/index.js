
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { TagItem } from '../index';

const styles = theme => {
  return {
    root: {},
    label: {
      fontSize: 16,
      margin: `${theme.spacing(2)}px 0`
    },
    tagContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'wrap'
    }
  };
};

const CustomTagMultiSelect = ({ classes, label, values, changed, items }) => {
  const isSelected = (name) => {
    return values.includes(name);
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>
        {label}
      </Typography>
      <div className={classes.tagContainer}>
        {items.map((item, index) => (
          <TagItem key={index} name={item} selected={isSelected(item)} onSelect={changed} />
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CustomTagMultiSelect);
