import type { Query } from '@cloudforet/core-lib/space-connector/type';

export interface ProviderListRequestParams {
    domain_id?: string;
    query?: Query;
    provider?: string[];
    name?: string;
    alias?: string;
    is_managed?: boolean;
}
