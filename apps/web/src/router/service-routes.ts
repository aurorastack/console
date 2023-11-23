import type { RouteConfig } from 'vue-router';

// Routes
import { store } from '@/store';

import { errorRoutes } from '@/router/error-routes';

import { ADMINISTRATION_ROUTE } from '@/services/administration/routes/route-constant';
import administrationRoute from '@/services/administration/routes/routes';
import alertManagerRoute from '@/services/alert-manager/routes/routes';
import assetInventoryRoute from '@/services/asset-inventory/routes/routes';
import authRoutes from '@/services/auth/routes/routes';
import costExplorerRoute from '@/services/cost-explorer/routes/routes';
import dashboardsRoute from '@/services/dashboards/routes/routes';
import { HOME_DASHBOARD_ROUTE } from '@/services/home-dashboard/routes/route-constant';
import homeDashboardRoute from '@/services/home-dashboard/routes/routes';
import infoRoute from '@/services/info/routes/routes';
import { MY_PAGE_ROUTE } from '@/services/my-page/routes/route-constant';
import myPageRoute from '@/services/my-page/routes/routes';
import projectRoute from '@/services/project/routes/routes';

export const ROOT_ROUTE = Object.freeze({
    _NAME: 'root',
});

export const serviceRoutes: RouteConfig[] = [
    ...authRoutes,
    {
        path: '/',
        name: ROOT_ROUTE._NAME,
        redirect: () => {
            if (store.getters['user/isDomainOwner'] || store.getters['user/hasSystemRole']) return { name: ADMINISTRATION_ROUTE._NAME };
            if (!store.getters['user/hasPermission']) return { name: MY_PAGE_ROUTE._NAME };
            return ({ name: HOME_DASHBOARD_ROUTE._NAME });
        },
        component: { template: '<router-view />' },
        children: [
            {
                path: 'dashboard',
                redirect: '/home-dashboard',
            },
            homeDashboardRoute,
            dashboardsRoute,
            administrationRoute,
            assetInventoryRoute,
            projectRoute,
            alertManagerRoute,
            costExplorerRoute,
            myPageRoute,
            infoRoute,
        ],
    },
    ...errorRoutes,
];
