import VueRouter from 'vue-router';
import { Getter } from 'vuex';

import { SpaceRouter } from '@/router';
import {
    CURRENCY_SYMBOL, SIDEBAR_TYPE,
} from '@/store/modules/display/config';
import {
    DisplayState, GNBMenu, SidebarProps,
} from '@/store/modules/display/type';


import { PagePermissionTuple } from '@/lib/access-control/page-permission-helper';
import config from '@/lib/config';
import {
    Menu, MENU_ID, MenuInfo,
} from '@/lib/menu/config';
import { MENU_LIST } from '@/lib/menu/menu-architecture';
import { MENU_INFO_MAP } from '@/lib/menu/menu-info';

export const hasUncheckedNotifications: Getter<DisplayState, any> = (state): boolean => state.uncheckedNotificationCount > 0;

export const isHandbookVisible: Getter<DisplayState, any> = (state): boolean => state.visibleSidebar && state.sidebarType === SIDEBAR_TYPE.handbook;

export const currencySymbol: Getter<DisplayState, any> = (state): string => CURRENCY_SYMBOL[state.currency] ?? '$';

export const sidebarProps: Getter<DisplayState, any> = (state): Partial<SidebarProps> => {
    if (state.sidebarType === SIDEBAR_TYPE.info) {
        return {
            styleType: 'primary',
            disableButton: false,
            size: 'md',
            disableScroll: false,
        };
    }
    if (state.sidebarType === SIDEBAR_TYPE.handbook) {
        return {
            styleType: 'secondary',
            disableButton: false,
            size: 'md',
            disableScroll: true,
        };
    }
    if (state.sidebarType === SIDEBAR_TYPE.widget) {
        return {
            styleType: 'primary',
            disableButton: true,
            size: 'sm',
            disableScroll: false,
        };
    }
    return { styleType: 'primary', disableButton: false, size: 'md' };
};

const filterMenuByRoute = (menuList: GNBMenu[], router: VueRouter): GNBMenu[] => menuList.reduce((results, _menu) => {
    const menu = { ..._menu };
    if (menu.subMenuList) {
        menu.subMenuList = filterMenuByRoute(menu.subMenuList, router);
        if (menu.subMenuList.length) {
            results.push(menu);
            return results;
        }
    }

    const link = router.resolve(menu.to);
    if (link?.href !== '/') results.push(menu);

    return results;
}, [] as GNBMenu[]);

const filterMenuByPermission = (menuList: GNBMenu[], pagePermissionList: PagePermissionTuple[]): GNBMenu[] => menuList.reduce((results, _menu) => {
    const menu = { ..._menu };

    if (menu.subMenuList) {
        menu.subMenuList = filterMenuByPermission(menu.subMenuList, pagePermissionList);
    }

    if (menu.subMenuList?.length) results.push(menu);
    else {
        const hasPermission = pagePermissionList.some(([permissionMenuId]) => permissionMenuId === menu.id);
        if (hasPermission) results.push(menu);
    }

    return results;
}, [] as GNBMenu[]);

const getGnbMenuList = (menuList: Menu[]): GNBMenu[] => menuList.map((d) => {
    const menuInfo: MenuInfo = MENU_INFO_MAP[d.id];
    return {
        ...d,
        label: menuInfo.label,
        icon: menuInfo.icon,
        isNew: menuInfo.isNew,
        isBeta: menuInfo.isBeta,
        to: { name: d.id },
        subMenuList: d.subMenuList ? getGnbMenuList(d.subMenuList) : [],
    } as GNBMenu;
});
export const allGnbMenuList: Getter<DisplayState, any> = (state, getters, rootState, rootGetters): GNBMenu[] => {
    const billingAccessibleDomainList: string[] = config.get('BILLING_ENABLED') ?? [];
    const _showBilling = billingAccessibleDomainList.includes(rootState.domain.domainId);
    const menuList = _showBilling ? MENU_LIST : MENU_LIST.filter(d => d.id !== MENU_ID.COST_EXPLORER);

    let _allGnbMenuList: GNBMenu[] = getGnbMenuList(menuList);
    _allGnbMenuList = filterMenuByRoute(_allGnbMenuList, SpaceRouter.router);
    _allGnbMenuList = filterMenuByPermission(_allGnbMenuList, rootGetters['user/pagePermissionList']);
    return _allGnbMenuList;
};

export const GNBMenuList: Getter<DisplayState, any> = (state, getters): GNBMenu[] => getters.allGnbMenuList.filter(d => !d.optional);
