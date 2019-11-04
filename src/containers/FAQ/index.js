import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { AccordionLayout } from '../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(8)
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(5)
    },
    description: {
      fontSize: 18,
      marginBottom: theme.spacing(1.5)
    }
  };
};

const FAQ = ({ classes, faqs }) => {
  const [expanded, setExpanded] = useState('faqPanel0');

  const expandHandler = panel => {
    setExpanded(panel);
  };

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        Frequently Asked Questions
      </Typography>
      {
        faqs.map(({ question, answers }, index) => (
          <AccordionLayout
            key={index}
            title={question}
            panel={`faqPanel${index}`}
            onExpand={expandHandler}
            selectedPanel={expanded}>
            {
              answers.map((answer, i) => (
                <Typography
                  key={i}
                  className={classes.description}>
                  {answer}
                </Typography>
              ))
            }
          </AccordionLayout>
        ))
      }
    </main>
  );
};

FAQ.propTypes = {
  classes: PropTypes.object.isRequired
};

FAQ.defaultProps = {
  faqs: [
    {
      question: 'What is Merit?',
      answers: [
        `We believe on-the-job performance is the best 
        indicator of future success, not inflated resumes 
        or generic interviews. Merit is a hiring platform 
        powered by trusted recommendations from people who've 
        worked together. We aggregate these recommendations 
        to showcase talent to hiring managers.`
      ]
    },
    {
      question: 'How can I make someone else a recommender?',
      answers: [
        `Send us an email at recommend@hellomerit.com with 
        the recommender cc’d or share your unique link and 
        password with the recommender directly.`
      ]
    },
    {
      question: 'How many people can I recommend?',
      answers: [
        `Up to 5 people.We want you to narrow it down to 
        the truly remarkable people you have worked with!`
      ]
    },
    {
      question: 'How will the recommendations I submit be used?',
      answers: [
        `We’ll invite the person you’ve recommended to opt-in to 
        emails and edit their profile. We’ll include your name in 
        our invitation since we believe transparency is important 
        to building trust. Want to give them a heads up? We’ll 
        wait 24 hours before inviting them.`,
        `We then share the recommendations with hiring managers who 
        have access to our platform. We require both parties to 
        opt-in before connecting a hiring manager and recommendee.`
      ]
    },
    {
      question: 'Should I only recommend someone actively looking for a job?',
      answers: [
        `No. Most people are open to hearing about other opportunities 
        regardless of if they already have a job. Plus, they might be 
        looking for opportunities in the future.`
      ]
    },

    {
      question: 'Should I recommend someone I currently work with?',
      answers: [
        `Up to you! There's no expectation you will do so, but 
        we welcome any outstanding people you recommend. 
        Think back across your career!`
      ]
    },
    {
      question: 'Should I focus on an industry area?',
      answers: [
        `No. We want to find the best people, regardless of industry 
        or job function. We are, however, looking for people with 
        roughly 3 to 10 years of experience.`
      ]
    },
    {
      question: 'I’ve been recommended. What happens now?',
      answers: [
        `We invite you to join Merit and edit your profile! 
        By joining, you will get to hear about opportunities 
        from hiring managers who trust Merit’s quality. 
        Joining does not mean you’re actively looking for a job, 
        but it lets you keep your options open in the future! 
        If you’re also a hiring manager, you’ll get to discover 
        other top talent once you contribute your recommendations. 
        Just go to the “recommend” section and get started.`
      ]
    },
    {
      question: 'I’ve been recommended. Will my employer find out?',
      answers: [
        `It’s possible, but to reiterate, being part of Merit does 
        not indicate you are actively looking for a new job. 
        All it means is that someone thinks very highly of you! 
        If you indicate on our platform that you are actively looking, 
        we will hide your recommendation from anyone currently working 
        at your employer.`
      ]
    },
    {
      question: 'Why should I participate?',
      answers: [
        `As a recommender, you’ll be paying it forward to people 
        who deserve recognition. And as someone who has been 
        recommended, you’ll get showcased to hiring managers 
        seeking top talent!`
      ]
    }
  ]
};

export default withStyles(styles)(FAQ);
