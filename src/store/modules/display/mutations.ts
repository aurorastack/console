import { Mutation } from 'vuex';
import { CURRENCY, SIDEBAR_TYPE } from '@/store/modules/display/config';
import { CurrencyRates, DisplayState } from './type';

export const setVisibleSidebar: Mutation<DisplayState> = (state, visible: boolean): void => {
    state.visibleSidebar = visible;
};

export const setSidebarType: Mutation<DisplayState> = (state, type: SIDEBAR_TYPE): void => {
    state.sidebarType = type;
};

export const setIsInitialized: Mutation<DisplayState> = (state, isInitialized: boolean): void => {
    state.isInitialized = isInitialized;
};

export const setIsLoading: Mutation<DisplayState> = (state, isLoading: boolean): void => {
    state.isLoading = isLoading;
};

export const setUncheckedNotificationCount: Mutation<DisplayState> = (state, count: number): void => {
    state.uncheckedNotificationCount = count;
};

export const setIsSignInFailed: Mutation<DisplayState> = (state, isSignInFailed: boolean): void => {
    state.isSignInFailed = isSignInFailed;
};

export const setCurrency: Mutation<DisplayState> = (state, currency: CURRENCY): void => {
    state.currency = currency;
};

export const setCurrencyRates: Mutation<DisplayState> = (state, rates: CurrencyRates): void => {
    state.currencyRates = rates;
};
