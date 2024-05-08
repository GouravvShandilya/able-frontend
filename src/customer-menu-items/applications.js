// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { KyberNetwork, Messages2, Calendar1, Kanban, Profile2User, Bill, UserSquare, ShoppingBag } from 'iconsax-react';

// icons
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.applications,
  type: 'group',
  children: [
    {
      id: 'Dashboard',
      title: <FormattedMessage id="Dashboard" />,
      url: '/customer/dashboard/default',
      type: 'item',
      icon: icons.invoice,
      breadcrumbs: true
    },
    {
      id: 'Deposit list',
      title: <FormattedMessage id="Deposit list" />,
      url: '/customer/apps/invoice/list',
      type: 'item',
      icon: icons.invoice,
      breadcrumbs: true
    },

    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'item',
      icon: icons.profile,
      url: '/customer/apps/profiles/user/personal'
    }
  ]
};

export default applications;
