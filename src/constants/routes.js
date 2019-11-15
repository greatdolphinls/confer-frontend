
import { GroundRules, RecommendForm, RecommendCount } from '../containers/Recommend';
import Discover from '../containers/Discover';
import {
  AdminUserList,
  AdminAddUser,
  AdminEditUser,
  AdminGroupList,
  AdminAddGroup,
  AdminEditGroup,
  AdminRecommendList,
  AdminAddRecommend,
  AdminEditRecommend,
  AdminRegisterList
} from '../containers/Admin';
import { roles } from './roles';
import { pageLinks } from './links';
import AccountManage from '../containers/AccountManage';
import { ProfileOverview, ProfileEdit } from '../containers/Profile';

const authRoutes = [
  {
    url: pageLinks.AccountManage.url,
    component: AccountManage,
    roles: [
      roles.ADMIN_ROLE,
      roles.REFERRER_ROLE,
      roles.WEAK_ROLE
    ]
  },
  {
    url: pageLinks.ProfileOverview.url,
    component: ProfileOverview,
    roles: [
      roles.REFERRER_ROLE
    ]
  },
  {
    url: pageLinks.ProfileEdit.url,
    component: ProfileEdit,
    roles: [
      roles.REFERRER_ROLE
    ]
  },
  {
    url: pageLinks.GroundRules.url,
    component: GroundRules,
    roles: [
      roles.REFERRER_ROLE,
      roles.WEAK_ROLE
    ]
  },
  {
    url: pageLinks.RecommendForm.url,
    component: RecommendForm,
    roles: [
      roles.REFERRER_ROLE,
      roles.WEAK_ROLE
    ]
  },
  {
    url: pageLinks.RecommendCount.url,
    component: RecommendCount,
    roles: [
      roles.REFERRER_ROLE,
      roles.WEAK_ROLE
    ]
  },
  {
    url: pageLinks.Discover.url,
    component: Discover,
    roles: [
      roles.ADMIN_ROLE,
      roles.REFERRER_ROLE
    ]
  },
  {
    url: pageLinks.AdminUserList.url,
    component: AdminUserList,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminAddUser.url,
    component: AdminAddUser,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminEditUser.url,
    component: AdminEditUser,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminGroupList.url,
    component: AdminGroupList,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminAddGroup.url,
    component: AdminAddGroup,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminEditGroup.url,
    component: AdminEditGroup,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminRecommendList.url,
    component: AdminRecommendList,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminAddRecommend.url,
    component: AdminAddRecommend,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminEditRecommend.url,
    component: AdminEditRecommend,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.AdminRegisterList.url,
    component: AdminRegisterList,
    roles: [
      roles.ADMIN_ROLE
    ]
  }
];

export {
  authRoutes
};
