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
      title: <FormattedMessage id="Collections" />,
      url: '/apps/invoice/dashboard',
      type: 'collapse',
      icon: icons.invoice,
      breadcrumbs: true,
      children: [
        {
          id: 'create',
          title: <FormattedMessage id="Create Collection" />,
          type: 'item',
          url: '/apps/invoice/create'
        },
        {
          id: 'list',
          title: <FormattedMessage id="Collections List" />,
          type: 'item',
          url: '/apps/invoice/list'
        },
        {
          id: 'Edit Requests',
          title: <FormattedMessage id="Edit Requests" />,
          type: 'item',
          url: '/apps/invoice/EditReqList'
        }
      ]
    },

    {
      id: 'Depositors-list',
      title: <FormattedMessage id="Depositors" />,
      type: 'item',
      icon: icons.customer,
      url: '/dashboard/Depositor-list'
    },
    {
      id: 'customer-list',
      title: <FormattedMessage id="Customers" />,
      type: 'item',
      icon: icons.customer,
      url: '/dashboard/Customer-list'
    },
    {
      id: 'user-profile',
      title: <FormattedMessage id="My Profile" />,
      type: 'item',
      url: '/apps/profiles/admin/edit',
      icon: icons.profile,
      breadcrumbs: false
    }
  ]
};

export default applications;
