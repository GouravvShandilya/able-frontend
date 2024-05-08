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
      id: 'invoice',
      title: <FormattedMessage id="invoice" />,
      url: '/user/apps/invoice/dashboard',
      type: 'collapse',
      icon: icons.invoice,
      breadcrumbs: true,
      children: [
        {
          id: 'create',
          title: <FormattedMessage id="create" />,
          type: 'item',
          url: '/user/apps/invoice/create'
        },
        {
          id: 'list',
          title: <FormattedMessage id="list" />,
          type: 'item',
          url: '/user/apps/invoice/list'
        }
      ]
    },
    {
      id: 'customer',
      title: <FormattedMessage id="customer" />,
      type: 'item',
      icon: icons.customer,
      url: '/user/apps/customer'
    },

    {
      id: 'profile',
      title: <FormattedMessage id="profile" />,
      type: 'item',
      icon: icons.profile,
      url: '/user/apps/profiles/user/personal'
    }
  ]
};

export default applications;
