
const defaultAvatarLink = '//www.gravatar.com/avatar/51b444b6cac7ba2671011bf7616c5d59?s=200&r=pg&d=mm';
const jwtTokenKey = 'jwtToken';
const pageLinks = {
  Home: {
    title: 'Home',
    url: '/'
  },
  ContactUs: {
    title: 'Contact us',
    url: 'mailto:contact@hellomerit.com'
  },
  TermsOfUse: {
    title: 'Terms of Use',
    url: '/terms-of-use'
  },
  PrivacyPolicy: {
    title: 'Privacy Policy',
    url: '/privacy'
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
  ProfileOverview: {
    title: 'Profile',
    url: '/profile-overview'
  },
  ProfileEdit: {
    title: 'Edit Profile',
    url: '/profile-edit'
  },
  AccountManage: {
    title: 'Account management',
    url: '/account-management'
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
  },
  AdminUserList: {
    title: 'Admin',
    url: '/admin/user/list'
  },
  AdminAddUser: {
    title: 'Admin',
    url: '/admin/user/add'
  },
  AdminEditUser: {
    title: 'Admin',
    url: '/admin/user/edit/:userId'
  },
  AdminGroupList: {
    title: 'Admin Group',
    url: '/admin/group/list'
  },
  AdminAddGroup: {
    title: 'Add Group',
    url: '/admin/group/add'
  },
  AdminEditGroup: {
    title: 'Edit Group',
    url: '/admin/group/edit/:groupId'
  },
  AdminRecommendList: {
    title: 'Admin Recommend',
    url: '/admin/recommend/list'
  },
  AdminAddRecommend: {
    title: 'Add Recommend',
    url: '/admin/recommend/add'
  },
  AdminEditRecommend: {
    title: 'Edit Recommend',
    url: '/admin/recommend/edit/:recommendId'
  },
  AdminRegisterList: {
    title: 'Admin Register',
    url: '/admin/register/list'
  },
};

export {
  jwtTokenKey,
  defaultAvatarLink,
  pageLinks
};
