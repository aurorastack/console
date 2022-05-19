// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { find } from 'lodash';
import { Getter } from 'vuex';

import { CloudServiceDetailStoreState } from '@/services/asset-inventory/store/cloud-service-detail/type';

export const isServer: Getter<CloudServiceDetailStoreState, any> = (state): boolean => state.selectedItem?.resource_type === 'inventory.Server';

export const serverCloudServiceType: Getter<CloudServiceDetailStoreState, any> = (state): string|undefined => find(state.cloudServiceTypeList, { resource_type: 'inventory.Server' })?.name;
