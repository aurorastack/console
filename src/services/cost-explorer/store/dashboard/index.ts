import {
    CustomLayout,
    DASHBOARD_PRIVACY_TYPE,
    WidgetInfo,
} from '@/services/cost-explorer/cost-dashboard/type';
import { CostDashboardState } from '@/services/cost-explorer/store/dashboard/type';

import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';


const state: CostDashboardState = {
    // for creating dashboard
    selectedTemplate: {},
    defaultFilter: {},
    selectedDashboardPrivacy: DASHBOARD_PRIVACY_TYPE.USER,
    includesFilter: false,

    // for selecting widget
    originSelectedWidget: {} as WidgetInfo,
    editedSelectedWidget: {} as WidgetInfo,

    // for customizing dashboard
    editedCustomLayout: [] as CustomLayout[],
    widgetPosition: undefined,
    layoutOfSpace: undefined,
};

export default {
    namespaced: true,
    state: () => ({ ...state }),
    actions,
    mutations,
    getters,
};
