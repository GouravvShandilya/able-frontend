// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart } from 'iconsax-react';

// icons
const icons = {
  widgets: Story,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const widget = {
  id: 'group-widget',
  title: <FormattedMessage id="widgets" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'statistics',
      title: <FormattedMessage id="statistics" />,
      type: 'item',
      url: '/user/widget/statistics',
      icon: icons.statistics
    },
    {
      id: 'data',
      title: <FormattedMessage id="data" />,
      type: 'item',
      url: '/user/widget/data',
      icon: icons.data
    },
    {
      id: 'chart',
      title: <FormattedMessage id="chart" />,
      type: 'item',
      url: '/user/widget/chart',
      icon: icons.chart
    }
  ]
};

export default widget;
