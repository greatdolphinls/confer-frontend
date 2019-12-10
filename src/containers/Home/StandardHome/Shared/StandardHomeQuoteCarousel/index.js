
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const styles = theme => {
  return {
    root: {
      width: '100%',
      zIndex: 2,
      '& li': {
        backgroundColor: 'unset !important'
      }
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    description: {
      width: 420,
      fontSize: 30,
      lineHeight: '45px',
      fontFamily: 'Ogg',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        lineHeight: '32px',
        fontSize: 22
      },
      '& span': {
        fontFamily: 'Ogg',
        backgroundImage: `linear-gradient(180deg, ${theme.palette.mainBackColor} 50%, ${theme.palette.sandBackColor} 100%)`
      }
    },
  };
};

const StandardHomeQuoteCarousel = ({ classes, quotes }) => {
  return (
    <div className={classes.root}>
      <Carousel
        showStatus={false}
        infiniteLoop={true}
        autoPlay
        showIndicators={false}
        showArrows={false}
        showThumbs={false}>
        {quotes.map(({ header, middle, footer, post }, index) => (
          <div key={index} className={classes.container}>
            <Typography className={classes.description}>
              {`“${header}`}
              <span>{middle}</span>
              {`${footer}”`}
            </Typography>
            <Typography>
              -{post}
            </Typography>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

StandardHomeQuoteCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
  quotes: PropTypes.array,
  responsive: PropTypes.object
};

StandardHomeQuoteCarousel.defaultProps = {
  quotes: [
    {
      header: 'She is brilliant analytically, among the ',
      middle: 'best strategists',
      footer: ' I have ever worked with.',
      post: 'MARK GERSON, CO-FOUNDER OF GLG'
    },
    {
      header: 'He’s one of the ',
      middle: 'most scrappy',
      footer: ' and tenacious professionals I know.',
      post: 'ANDY DUNN, CO-FOUNDER OF BONOBOS'
    },
    {
      header: 'She’s an ',
      middle: 'inspirational leader',
      footer: ' with a ton of hustle who can transform any team.',
      post: 'MIA MERRILL, VP AT VENTURE STUDIO'
    },
    {
      header: 'She was our ',
      middle: 'top seller',
      footer: ' and closed our biggest deals...  an incredible mentor',
      post: 'ANIQ RAHMAN, CO-FOUNDER OF MOAT'
    },
    {
      header: 'He’s smart and ',
      middle: 'hard working.',
      footer: ' He can make cold calls and present to executives.',
      post: 'C.R. SINCOCK, CEO OF AVFLIGHT'
    }
  ]
};

export default withStyles(styles, { withTheme: true })(StandardHomeQuoteCarousel);
