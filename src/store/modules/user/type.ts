import { AccessLevel } from '@/lib/access-control/config';
import { PagePermission } from '@/lib/access-control/page-permission-helper';

type UserType = 'USER' | 'DOMAIN_OWNER' | 'API_USER';
type UserBackend = 'LOCAL' | 'EXTERNAL';
type RoleType = 'SYSTEM' | 'DOMAIN' | 'PROJECT';
export type LanguageCode = 'ko' | 'en' | string;
// export type Timezone = 'UTC' | 'Asia/Seoul' | string;

export interface UserRole {
    roleId?: string;
    name: string;
    roleType: RoleType;
    pagePermissions: PagePermission[];
}

export interface UserState {
    isSessionExpired?: boolean;
    userId?: string;
    userType?: UserType;
    backend?: UserBackend;
    name?: string;
    email?: string;
    language?: string;
    timezone?: string;
    roles?: Array<UserRole>;
    accessLevel: AccessLevel;
}

export interface SignInRequest {
    domainId: string;
    userId?: string;
    userType: UserType;
    credentials: any;
}

export interface UpdateUserRequest {
    name?: string;
    password?: string;
    email?: string;
    language?: string;
    timezone?: string;
    tags?: Record<string, any>;
}
