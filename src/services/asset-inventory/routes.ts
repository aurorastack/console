import { upperCase } from 'lodash';
import { RouteConfig } from 'vue-router';

import { MENU_ID } from '@/lib/menu/config';
import { getMenuLabel } from '@/lib/menu/menu-info';

import { ASSET_INVENTORY_ROUTE } from '@/services/asset-inventory/route-config';

const AssetInventoryContainer = () => import(/* webpackChunkName: "AssetInventoryContainer" */ '@/services/asset-inventory/AssetInventoryContainer.vue');

const CloudServiceDetailPage = () => import(/* webpackChunkName: "CloudServiceDetailPage" */ '@/services/asset-inventory/cloud-service/cloud-service-detail/CloudServiceDetailPage.vue');
const CloudServiceSearch = () => import(/* webpackChunkName: "CloudServiceSearch" */ '@/services/asset-inventory/cloud-service/cloud-service-search/CloudServiceSearchPage.vue');
const CloudServiceTypeSearch = () => import(/* webpackChunkName: "CloudServiceTypeSearch" */ '@/services/asset-inventory/cloud-service/cloud-service-type-search/CloudServiceTypeSearchPage.vue');

const ServerPage = () => import(/* webpackChunkName: "ServerPage" */ '@/services/asset-inventory/server/ServerPage.vue');
const CloudServicePage = () => import(/* webpackChunkName: "CloudServicePage" */ '@/services/asset-inventory/cloud-service/CloudServicePage.vue');
const NoResourcePage = () => import(/* webpackChunkName: "NoResourcePage" */ '@/common/pages/NoResourcePage.vue');

const CollectorPage = () => import(/* webpackChunkName: "CollectorPage" */ '@/services/asset-inventory/collector/CollectorPage.vue');
const CollectorPluginPage = () => import(/* webpackChunkName: "CollectorPlugin" */ '@/services/asset-inventory/collector/collector-plugins/CollectorPluginsPage.vue');
const CreateCollectorPage = () => import(/* webpackChunkName: "CreateCollector" */ '@/services/asset-inventory/collector/create-collector/CreateCollectorPage.vue');

const ServiceAccountPage = () => import(/* webpackChunkName: "ServiceAccountPage" */ '@/services/asset-inventory/service-account/ServiceAccountPage.vue');
const ServiceAccountAddPage = () => import(/* webpackChunkName: "ServiceAccountAddPage" */ '@/services/asset-inventory/service-account/service-account-add/ServiceAccountAddPage.vue');
const ServiceAccountSearchPage = () => import(/* webpackChunkName: "ServiceAccountSearchPage" */ '@/services/asset-inventory/service-account/service-account-search/ServiceAccountSearchPage.vue');

const CollectorHistoryPage = () => import(/* webpackChunkName: "CollectorHistory" */ '@/services/asset-inventory/collector/collector-history/CollectorHistoryPage.vue');
const CollectJobPage = () => import(/* webpackChunkName: "CollectorHistory" */ '@/services/asset-inventory/collector/collector-history/collect-job/CollectJobPage.vue');


const assetInventoryRoute: RouteConfig = {
    path: 'asset-inventory',
    name: ASSET_INVENTORY_ROUTE._NAME,
    meta: { label: getMenuLabel(MENU_ID.ASSET_INVENTORY), accessLevel: 'VIEW_PERMISSION' },
    redirect: '/asset-inventory/cloud-service',
    component: AssetInventoryContainer,
    children: [
        {
            path: 'cloud-service',
            meta: { label: getMenuLabel(MENU_ID.ASSET_INVENTORY_CLOUD_SERVICE) },
            component: { template: '<router-view />' },
            children: [
                {
                    path: '/',
                    name: ASSET_INVENTORY_ROUTE.CLOUD_SERVICE._NAME,
                    meta: { lnbVisible: true },
                    component: CloudServicePage as any,
                },
                {
                    path: 'search/:searchKey/:id',
                    name: ASSET_INVENTORY_ROUTE.CLOUD_SERVICE.SEARCH._NAME,
                    props: true,
                    component: CloudServiceSearch,
                },
                {
                    path: 'type/search/:id',
                    name: ASSET_INVENTORY_ROUTE.CLOUD_SERVICE.TYPE_SEARCH._NAME,
                    props: true,
                    component: CloudServiceTypeSearch,
                },
                {
                    path: 'no-resource',
                    name: ASSET_INVENTORY_ROUTE.CLOUD_SERVICE.NO_RESOURCE._NAME,
                    meta: { lnbVisible: true, label: 'No Resource' },
                    component: NoResourcePage,
                },
                {
                    path: ':provider/:group',
                    meta: { label: ({ params }) => `[${upperCase(params.provider)}] ${params.group}` },
                    component: { template: '<router-view />' },
                    children: [
                        {
                            path: ':name?',
                            name: ASSET_INVENTORY_ROUTE.CLOUD_SERVICE.DETAIL._NAME,
                            meta: { lnbVisible: true, label: ({ params }) => params.name },
                            props: true,
                            component: CloudServiceDetailPage as any,
                        },
                    ],
                },
            ],
        },
        {
            path: 'server',
            name: ASSET_INVENTORY_ROUTE.SERVER._NAME,
            meta: { lnbVisible: true, label: getMenuLabel(MENU_ID.ASSET_INVENTORY_SERVER) },
            component: ServerPage as any,
        },
        {
            path: 'collector',
            meta: { label: getMenuLabel(MENU_ID.ASSET_INVENTORY_COLLECTOR) },
            component: { template: '<router-view />' },
            children: [
                {
                    path: '/',
                    name: ASSET_INVENTORY_ROUTE.COLLECTOR._NAME,
                    meta: { lnbVisible: true },
                    props: true,
                    component: CollectorPage as any,
                },
                {
                    path: 'create',
                    meta: { label: 'Create Collector' },
                    component: { template: '<router-view />' },
                    children: [
                        {
                            path: '/',
                            name: ASSET_INVENTORY_ROUTE.COLLECTOR.CREATE._NAME,
                            meta: { lnbVisible: true, accessLevel: 'MANAGE_PERMISSION' },
                            component: CollectorPluginPage as any,
                        },
                        {
                            path: ':pluginId',
                            name: ASSET_INVENTORY_ROUTE.COLLECTOR.CREATE.STEPS._NAME,
                            meta: { label: ({ params }) => params.pluginId, copiable: true, accessLevel: 'MANAGE_PERMISSION' },
                            props: true,
                            component: CreateCollectorPage as any,
                        },
                    ],
                },
                {
                    path: 'history',
                    meta: { label: 'Collector History' },
                    component: { template: '<keep-alive><router-view /></keep-alive>' },
                    children: [
                        {
                            path: '/',
                            name: ASSET_INVENTORY_ROUTE.COLLECTOR.HISTORY._NAME,
                            meta: { lnbVisible: true },
                            component: CollectorHistoryPage as any,
                        },
                        {
                            path: ':jobId',
                            name: ASSET_INVENTORY_ROUTE.COLLECTOR.HISTORY.JOB._NAME,
                            meta: { lnbVisible: true, label: ({ params }) => params.jobId, copiable: true },
                            props: true,
                            component: CollectJobPage as any,
                        },
                    ],
                },
            ],
        },
        {
            path: 'service-account',
            meta: { label: getMenuLabel(MENU_ID.ASSET_INVENTORY_SERVICE_ACCOUNT) },
            component: { template: '<router-view />' },
            children: [
                {
                    path: '/',
                    name: ASSET_INVENTORY_ROUTE.SERVICE_ACCOUNT._NAME,
                    meta: { lnbVisible: true },
                    props: true,
                    component: ServiceAccountPage as any,
                },
                {
                    path: 'search/:id',
                    name: ASSET_INVENTORY_ROUTE.SERVICE_ACCOUNT.SEARCH._NAME,
                    props: true,
                    component: ServiceAccountSearchPage,
                },
                {
                    path: 'add/:provider',
                    name: ASSET_INVENTORY_ROUTE.SERVICE_ACCOUNT.ADD._NAME,
                    meta: { label: 'Add Service Account', accessLevel: 'MANAGE_PERMISSION' },
                    props: true,
                    component: ServiceAccountAddPage as any,
                },
                {
                    path: 'no-resource',
                    name: ASSET_INVENTORY_ROUTE.SERVICE_ACCOUNT.NO_RESOURCE._NAME,
                    meta: { lnbVisible: true, label: 'No Resource' },
                    component: NoResourcePage,
                },
            ],
        },
    ],
};
export default assetInventoryRoute;
