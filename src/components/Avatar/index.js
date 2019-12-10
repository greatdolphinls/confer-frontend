import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import { defaultAvatarLink } from '../../constants/links';
import theme from '../../theme/muiTheme';

const styles = () => {
  return {
    root: {
      borderRadius: '50%',
      objectFit: 'cover'
    },
    border: {
      padding: theme.spacing(0.5),
      border: `${theme.spacing(0.15)}px solid ${theme.palette.buttonColor}`
    }
  };
};

const Avatar = ({ src, size, isBorder, classes, ...props }) => {
  return (
    <div {...props}>
      <img
        alt=''
        src={src || defaultAvatarLink}
        width={size}
        height={size}
        className={classNames(classes.root, { [classes.border]: isBorder })}
      />
    </div>
  )
}

Avatar.defaultProps = {
  src: defaultAvatarLink,
  size: 158,
  isBorder: false
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  isBorder: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(Avatar);