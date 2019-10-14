import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme/muiTheme';
import Layout from './hoc/layout';
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
import { pageLinks } from './constants/links';
import { authRoutes } from './constants/routes';
import { hasValidToken, validateRoleAccess } from './utils/utility';

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
                      </Switch>
                    )
                    : (
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
