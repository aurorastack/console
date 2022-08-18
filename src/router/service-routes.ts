import type { RouteConfig } from 'vue-router';

// Routes
import { store } from '@/store';

import { errorRoutes } from '@/router/error-routes';

import { ADMINISTRATION_ROUTE } from '@/services/administration/route-config';
import administrationRoute from '@/services/administration/routes';
import alertManagerRoute from '@/services/alert-manager/routes';
import assetInventoryRoute from '@/services/asset-inventory/routes';
import authRoutes from '@/services/auth/routes';
import costExplorerRoute from '@/services/cost-explorer/routes';
import { DASHBOARD_ROUTE } from '@/services/dashboard/route-config';
import dashboardRoute from '@/services/dashboard/routes';
import infoRoute from '@/services/info/routes';
import myPageRoute from '@/services/my-page/routes';
import projectRoute from '@/services/project/routes';


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
            return ({ name: DASHBOARD_ROUTE._NAME });
        },
        component: { template: '<router-view />' },
        children: [
            dashboardRoute,
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
