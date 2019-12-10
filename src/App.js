import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/muiTheme';
import Layout from './hoc/layout';
import { pageLinks } from './constants/links';
import { authRoutes } from './constants/routes';
import { hasValidToken, validateRoleAccess } from './utils/utility';
import GA from './utils/googleAnalytics';

const StandardHome = lazy(() => import(/* webpackChunkName: 'Home' */ './containers/Home/StandardHome'));
const RecommendHome = lazy(() => import(/* webpackChunkName: 'Home' */ './containers/Home/RecommendHome'));
const TermsOfUse = lazy(() => import(/* webpackChunkName: 'TermsOfUse' */ './containers/TermsOfUse'));
const PrivacyPolicy = lazy(() => import(/* webpackChunkName: 'PrivacyPolicy' */ './containers/PrivacyPolicy'));
const FAQ = lazy(() => import(/* webpackChunkName: 'FAQ' */ './containers/FAQ'));
const SignUp = lazy(() => import(/* webpackChunkName: 'SignUp' */ './containers/Authentification/SignUp'));
const SignIn = lazy(() => import(/* webpackChunkName: 'SignIn' */ './containers/Authentification/SignIn'));
const ForgotPassword = lazy(() => import(/* webpackChunkName: 'ForgotPassword' */ './containers/Authentification/ForgotPassword'));
const Verification = lazy(() => import(/* webpackChunkName: 'Verification' */ './containers/Authentification/Verification'));
const ResetPassword = lazy(() => import(/* webpackChunkName: 'ResetPassword' */ './containers/Authentification/ResetPassword'));
const SuccessResetPassword = lazy(() => import(/* webpackChunkName: 'SuccessResetPassword' */ './containers/Authentification/SuccessResetPassword'));
const CandidateOverview = lazy(() => import(/* webpackChunkName: 'CandidateOverview' */ './containers/Candidate/CandidateOverview'));
const CandidateSignup = lazy(() => import(/* webpackChunkName: 'CandidateSignup' */ './containers/Candidate/CandidateSignup'));

class App extends Component {
  render() {
    const { loadingStatus, loggedInUser } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <LoadingOverlay
          active={loadingStatus.loading}
          spinner
          styles={{
            wrapper: {
              height: '100%',
              position: 'relative'
            },
            overlay: base => ({
              ...base,
              zIndex: 1400
            })
          }}
          text={loadingStatus.text}>
          <Layout>
            <Suspense fallback={<div></div>}>
              {GA.init() && <GA.RouteTracker />}
              <Switch>
                <Route exact path={pageLinks.SignUp.url} component={SignUp} />
                <Route exact path={pageLinks.SignIn.url} component={SignIn} />
                <Route exact path={pageLinks.ForgotPassword.url} component={ForgotPassword} />
                <Route exact path={pageLinks.Verification.url} component={Verification} />
                <Route exact path={pageLinks.ResetPassword.url} component={ResetPassword} />
                <Route exact path={pageLinks.SuccessResetPassword.url} component={SuccessResetPassword} />
                <Route exact path={pageLinks.StandardHome.url} component={StandardHome} />
                <Route exact path={pageLinks.RecommendHome.url} component={RecommendHome} />
                <Route exact path={pageLinks.TermsOfUse.url} component={TermsOfUse} />
                <Route exact path={pageLinks.PrivacyPolicy.url} component={PrivacyPolicy} />
                <Route exact path={pageLinks.FAQ.url} component={FAQ} />
                <Route exact path={pageLinks.CandidateOverview.url} component={CandidateOverview} />
                <Route exact path={pageLinks.CandidateSignup.url} component={CandidateSignup} />
                <Route
                  render={() =>
                    hasValidToken()
                      ? (
                        <Switch>
                          {authRoutes.filter(authRoute => validateRoleAccess(authRoute.roles, loggedInUser))
                            .map(authRoute => (
                              <Route
                                key={authRoute.url}
                                exact
                                path={authRoute.url}
                                component={authRoute.component}
                              />
                            ))
                          }
                          <Redirect to={pageLinks.GroundRules.url} />
                        </Switch>
                      )
                      : (
                        <Redirect to={pageLinks.SignIn.url} />
                      )
                  }
                />
              </Switch>
            </Suspense>
          </Layout>
        </LoadingOverlay>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  loadingStatus: state.loading.loadingStatus,
  loggedInUser: state.auth.user,
});

export default connect(mapStateToProps)(App);
