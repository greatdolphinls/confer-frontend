
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import * as USER_SERVICE from '../../../services/user';
import { setCurrentProfile, editCurrentUserInfo } from '../../../actions';
import { PrimaryButton } from '../../../components';
import { CandidateLayout } from '../Shared';
import { PreviewProfileCard, ProfileProgressBar } from './Shared';
import { isEmpty, showErrorToast } from '../../../utils/utility';
import { pageLinks } from '../../../constants/links';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(5)
    },
    container: {
      width: 680,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      marginTop: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    }
  };
};

const CandidatePreviewProfile = ({ classes, history }) => {
  const { user } = useSelector(state => state.auth, []);
  const { profile } = useSelector(state => state.auth, {});
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(setCurrentProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user.isReferrer || !user.isCandidate) {
      history.push(pageLinks.RecommendForm.url);
    }

    if (!user.isProfile) {
      history.push(pageLinks.CandidateGenerateProfile.url);
    }

    if (!user.isFetch) {
      setIsFetching(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const endFetching = async () => {
    try {
      const data = {
        _id: user.id,
        isFetch: true
      };

      await USER_SERVICE.generateProfile(data);
      await dispatch(editCurrentUserInfo({ isFetch: true }))
    } catch (error) {
      // TODO: axios handling module
      console.log('great dolphin : [containers CandidatePreviewProfile endFetching] error => ', error);
      if (error.response) {
        const { message: errorMessage } = error.response.data;
        showErrorToast(errorMessage);
      }
    }
    await setIsFetching(false);
  }

  const editButtonHandler = () => {
    history.push(pageLinks.ProfileEdit.url);
  }

  return (
    <main className={classes.root}>
      {
        !isEmpty(profile) &&
        <CandidateLayout
          title={isFetching
            ? 'Creating your personalized profile.'
            : 'You’re in! Edit your profile to add your personal touch.'}>
          <div className={classes.container}>
            {
              isFetching &&
              <ProfileProgressBar
                endFetching={endFetching} />
            }
            <PreviewProfileCard
              isFetching={isFetching}
              candidate={profile}
            />
            <PrimaryButton
              disabled={isFetching}
              onClick={editButtonHandler}>
              EDIT MY PROFILE
            </PrimaryButton>
          </div>
        </CandidateLayout>
      }
    </main>
  );
};

CandidatePreviewProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CandidatePreviewProfile);
