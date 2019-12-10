import { lazy} from 'react';

import { roles } from './roles';
import { pageLinks } from './links';

const GroundRules = lazy(() => import(/* webpackChunkName: 'GroundRules' */ '../containers/Recommend/GroundRules'));
const RecommendForm = lazy(() => import(/* webpackChunkName: 'RecommendForm' */ '../containers/Recommend/RecommendForm'));
const RecommendCount = lazy(() => import(/* webpackChunkName: 'RecommendCount' */ '../containers/Recommend/RecommendCount'));

const Discover = lazy(() => import(/* webpackChunkName: 'Discover' */ '../containers/Discover'));
const AccountManage = lazy(() => import(/* webpackChunkName: 'AccountManage' */ '../containers/AccountManage'));

const AdminUserList = lazy(() => import(/* webpackChunkName: 'AdminUserList' */ '../containers/Admin/User/UserList'));
const AdminAddUser = lazy(() => import(/* webpackChunkName: 'AdminAddUser' */ '../containers/Admin/User/AddUser'));
const AdminEditUser = lazy(() => import(/* webpackChunkName: 'AdminEditUser' */ '../containers/Admin/User/EditUser'));
const AdminGroupList = lazy(() => import(/* webpackChunkName: 'AdminGroupList' */ '../containers/Admin/Group/GroupList'));
const AdminAddGroup = lazy(() => import(/* webpackChunkName: 'AdminAddGroup' */ '../containers/Admin/Group/AddGroup'));
const AdminEditGroup = lazy(() => import(/* webpackChunkName: 'AdminEditGroup' */ '../containers/Admin/Group/EditGroup'));
const AdminRecommendList = lazy(() => import(/* webpackChunkName: 'AdminRecommendList' */ '../containers/Admin/Recommend/RecommendList'));
const AdminAddRecommend = lazy(() => import(/* webpackChunkName: 'AdminAddRecommend' */ '../containers/Admin/Recommend/AddRecommend'));
const AdminEditRecommend = lazy(() => import(/* webpackChunkName: 'AdminEditRecommend' */ '../containers/Admin/Recommend/EditRecommend'));
const AdminRegisterList = lazy(() => import(/* webpackChunkName: 'AdminRegisterList' */ '../containers/Admin/Register/RegisterList'));
const AdminContactList = lazy(() => import(/* webpackChunkName: 'AdminContactList' */ '../containers/Admin/Contact/ContactList'));

const CandidateGenerateProfile = lazy(() => import(/* webpackChunkName: 'CandidateGenerateProfile' */ '../containers/Candidate/CandidateGenerateProfile'));
const CandidatePreviewProfile = lazy(() => import(/* webpackChunkName: 'CandidatePreviewProfile' */ '../containers/Candidate/CandidatePreviewProfile'));
const CandidateEditProfile = lazy(() => import(/* webpackChunkName: 'CandidateEditProfile' */ '../containers/Candidate/CandidateEditProfile'));

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
    component: CandidatePreviewProfile,
    roles: [
      roles.REFERRER_ROLE
    ]
  },
  {
    url: pageLinks.ProfileEdit.url,
    component: CandidateEditProfile,
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
  },
  {
    url: pageLinks.AdminContactList.url,
    component: AdminContactList,
    roles: [
      roles.ADMIN_ROLE
    ]
  },
  {
    url: pageLinks.CandidateGenerateProfile.url,
    component: CandidateGenerateProfile,
    roles: [
      roles.REFERRER_ROLE,
      roles.WEAK_ROLE
    ]
  }
];

export {
  authRoutes
};
