import { SpaceConnector } from '@spaceone/console-core-lib/space-connector';
import {
    isInstanceOfAPIError, isInstanceOfAuthenticationError, isInstanceOfAuthorizationError,
    isInstanceOfBadRequestError,
} from '@spaceone/console-core-lib/space-connector/error';
import { TranslateResult } from 'vue-i18n';

import { SpaceRouter } from '@/router';

import { isRouteAccessible } from '@/lib/access-control';
import { showErrorMessage } from '@/lib/helper/notice-alert-helper';

import { isInstanceOfNoResourceError, isInstanceOfNoSearchResourceError } from '@/common/composables/error/error';


interface GlobalErrorHandlers {
    authenticationErrorHandler: () => void;
    authorizationErrorHandler: () => void;
}

export default class ErrorHandler {
    private static authenticationErrorHandler;

    private static authorizationErrorHandler;

    static init({ authenticationErrorHandler, authorizationErrorHandler }: GlobalErrorHandlers) {
        ErrorHandler.authenticationErrorHandler = authenticationErrorHandler;
        ErrorHandler.authorizationErrorHandler = authorizationErrorHandler;
    }

    static handleError(error) {
        if (isInstanceOfAuthenticationError(error)) {
            const isTokenAlive = SpaceConnector.isTokenAlive;

            if (!isTokenAlive
                && isRouteAccessible(SpaceRouter.router.currentRoute, 'AUTHENTICATED')) {
                ErrorHandler.authenticationErrorHandler();
            }
        } else if (isInstanceOfAuthorizationError(error)) {
            ErrorHandler.authorizationErrorHandler();
            console.error(error);
        } else if (isInstanceOfNoResourceError(error)) {
            showErrorMessage('No Resource', 'No Resource');
            SpaceRouter.router.push(error.redirectUrl);
        } else if (isInstanceOfNoSearchResourceError(error)) {
            SpaceRouter.router.push(error.redirectUrl);
        } else if (isInstanceOfAPIError(error)) {
            console.error('API Error', error);
        } else {
            console.error(error);
        }
    }

    static handleRequestError(error, errorMessage: TranslateResult) {
        if (!isInstanceOfAuthorizationError(error)) {
            if (isInstanceOfBadRequestError(error) && errorMessage) showErrorMessage(errorMessage, error);
            else if (isInstanceOfAPIError(error)) showErrorMessage('Something is Wrong! Please contact the administrator.', error);
        }
        this.handleError(error);
    }
}
