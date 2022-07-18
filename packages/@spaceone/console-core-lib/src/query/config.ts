import type { OperatorType } from '@/component-util/query-search/type';
import type { RawQueryOperator } from '@/query/type';
import type { FilterOperator } from '@/space-connector/type';

export const rawQueryOperatorToApiQueryOperatorMap: Record<RawQueryOperator, FilterOperator> = {
    '': 'contain',
    '!': 'not_contain',
    '=': 'eq',
    '!=': 'not',
    /* single only */
    '>': 'gt',
    '>=': 'gte',
    '<': 'lt',
    '<=': 'lte',
    '~': 'regex',
    /* datetime only */
    '>t': 'datetime_gt',
    '>=t': 'datetime_gte',
    '<t': 'datetime_lt',
    '<=t': 'datetime_lte',
    '=t': 'datetime_gt',
};

export const datetimeRawQueryOperatorToQueryTagOperatorMap: Partial<Record<RawQueryOperator, OperatorType>> = {
    '>t': '>',
    '>=t': '>=',
    '<t': '<',
    '<=t': '<=',
    '=t': '=',
};

export const rawQueryOperatorToPluralApiQueryOperatorMap: Partial<Record<RawQueryOperator, FilterOperator>> = {
    '': 'contain_in',
    '!': 'not_contain_in',
    '=': 'in',
    '!=': 'not_in',
};

// export const pluralRawQueryOperatorToSingularRawQueryOperatorMap: Partial<Record<RawQueryOperator, RawQueryOperator>> = {
//     '': '',
//     '!': 'not_contain_in',
//     '=': 'in',
//     '!=': 'not_in',
// };
