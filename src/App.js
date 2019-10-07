import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/muiTheme';
import Layout from './hoc/layout';
import { pageLinks } from './constants/links';
import {
  SignUp,
  SignIn,
  ForgotPassword,
  Verification,
  ResetPassword,
  SuccessResetPassword
} from './containers/Authentification';
import ContactUs from './containers/ContactUs';
import TermsOfUse from './containers/TermsOfUse';
import PrivacyPolicy from './containers/PrivacyPolicy';
import FAQ from './containers/FAQ';
import { GroundRules, RecommendForm, RecommendCount } from './containers/Recommend';
import Discover from './containers/Discover';
import { hasValidToken } from './utils/utility';

class App extends Component {
  render() {
    const { loadingStatus } = this.props;

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
            <Switch>
              <Route path={pageLinks.SignUp.url} component={SignUp} />
              <Route path={pageLinks.SignIn.url} component={SignIn} />
              <Route path={pageLinks.ForgotPassword.url} component={ForgotPassword} />
              <Route path={pageLinks.Verification.url} component={Verification} />
              <Route path={pageLinks.ResetPassword.url} component={ResetPassword} />
              <Route path={pageLinks.SuccessResetPassword.url} component={SuccessResetPassword} />
              <Route path={pageLinks.ContactUs.url} component={ContactUs} />
              <Route path={pageLinks.TermsOfUse.url} component={TermsOfUse} />
              <Route path={pageLinks.PrivacyPolicy.url} component={PrivacyPolicy} />
              <Route path={pageLinks.FAQ.url} component={FAQ} />
              <Route
                render={() =>
                  hasValidToken() ? (
                    <Switch>
                      <Route path={pageLinks.GroundRules.url} exact component={GroundRules} />
                      <Route path={pageLinks.RecommendForm.url} exact component={RecommendForm} />
                      <Route path={pageLinks.RecommendCount.url} exact component={RecommendCount} />
                      <Route path={pageLinks.Discover.url} exact component={Discover} />
                    </Switch>
                  ) : (
                      <Redirect to={pageLinks.SignIn.url} />
                    )
                }
              />
            </Switch>
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
