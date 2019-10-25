const roles = {
  GROUP_DISCOVER_ROLE: 1,
  GROUP_CASH_ROLE: 2,
  ADMIN_ROLE: 1,
  REFERRER_ROLE: 2,
  WEAK_ROLE: 3
}

const userRoles = [
  {
    value: roles.REFERRER_ROLE,
    label: 'Standard User'
  },
  {
    value: roles.WEAK_ROLE,
    label: 'Weak User'
  },
  {
    value: roles.ADMIN_ROLE,
    label: 'Admin'
  }
];

const groupRoles = [
  {
    value: roles.GROUP_DISCOVER_ROLE,
    label: 'Standard Group'
  },
  {
    value: roles.GROUP_CASH_ROLE,
    label: 'Cash Group'
  }
];

export {
  roles,
  userRoles,
  groupRoles
};