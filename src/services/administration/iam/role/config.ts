export const ROLE_TYPE = Object.freeze({
    SYSTEM: 'SYSTEM',
    PROJECT: 'PROJECT',
    DOMAIN: 'DOMAIN',
} as const);

export type ROLE_TYPE = typeof ROLE_TYPE[keyof typeof ROLE_TYPE];
export const ROLE_TYPE_LABEL = Object.freeze({
    DOMAIN: {
        label: 'Admin',
    },
    PROJECT: {
        label: 'User',
    },
} as const);
export const ROLE_TYPE_BADGE_OPTION = Object.freeze({
    [ROLE_TYPE.SYSTEM]: { label: 'System', styleType: 'secondary1' },
    [ROLE_TYPE.DOMAIN]: { label: 'Admin', styleType: 'primary1' },
    [ROLE_TYPE.PROJECT]: { label: 'User', styleType: 'gray' },
});
