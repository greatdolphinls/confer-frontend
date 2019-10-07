
const defaultAvatarLink = '//www.gravatar.com/avatar/51b444b6cac7ba2671011bf7616c5d59?s=200&r=pg&d=mm';
const jwtTokenKey = 'jwtToken';

const pageLinks = {
    ContactUs: {
        title: 'Contact us',
        url: '/contact-us'
    },
    TermsOfUse: {
        title: 'Terms of Use',
        url: '/terms-of-use'
    },
    PrivacyPolicy: {
        title: 'Privacy Policy',
        url: '/privacy-policy'
    },
    FAQ: {
        title: 'FAQ',
        url: '/faq'
    },
    SignIn: {
        title: 'Sign In',
        url: '/signin'
    },
    SignUp: {
        title: 'Sign Up',
        url: '/signup/:group'
    },
    Logout: {
        title: 'Logout',
        url: '/logout'
    },
    ForgotPassword: {
        title: 'Forgot Password',
        url: '/forgot-password'
    },
    ResetPassword: {
        title: 'Reset Password',
        url: '/reset-password/:token'
    },
    Verification: {
        title: 'Verification',
        url: '/verification/:token'
    },
    SuccessResetPassword: {
        title: 'Success Reset Password',
        url: '/success-reset-password'
    },
    GroundRules: {
        title: 'Ground Rules',
        url: '/recommend/ground-rules'
    },
    Discover: {
        title: 'Discover',
        url: '/discover'
    },
    RecommendForm: {
        title: 'Recommend Form',
        url: '/recommend/form'
    },
    RecommendCount: {
        title: 'Recommend',
        url: '/recommend/count'
    }
};

export {
    jwtTokenKey,
    defaultAvatarLink,
    pageLinks
};
