import type { TranslateResult } from 'vue-i18n';

import type { Currency, CurrencyRates } from '@/store/modules/settings/type';

import type { RouteQueryString } from '@/lib/router-query-string';

import type { COST_ANALYSIS_PERIOD_TYPE } from '@/services/cost-explorer/cost-analysis/config';
import type { CostAnalysisPageUrlQueryKey } from '@/services/cost-explorer/cost-analysis/lib/config';
import type {
    Period, Granularity, CostFiltersMap,
} from '@/services/cost-explorer/type';


export type CostAnalysisPageUrlQuery = Partial<Record<CostAnalysisPageUrlQueryKey, RouteQueryString>>;

export interface CostAnalysisPageQueryValue {
    period?: Period;
    group_by?: string[];
    filters?: CostFiltersMap;
    granularity?: Granularity;
}

export interface QueryItemResource {
    key: string;
    name: string;
}


/* widget spec */
export interface ChartData {
    [key: string]: any;
}
export interface XYChartData {
    date: string;
    totalCost?: number;
    aggregation?: number;
    [key: string]: any;
}
interface Cost {
    [key: string]: number;
}
export interface Legend {
    name: string;
    label: string | TranslateResult;
    color?: string;
    disabled?: boolean;
}

export interface CostAnalyzeModel {
    total_cost?: number;
    cost: Cost | number;
    is_others?: boolean;
    [key: string]: any;
}

export type CostAnalysisPeriodType = typeof COST_ANALYSIS_PERIOD_TYPE[keyof typeof COST_ANALYSIS_PERIOD_TYPE];

/* component props */
export interface WidgetProps<Options = any> {
    widgetId?: string;
    name?: string;
    options: Options;
    period: Period;
    filters: CostFiltersMap;
    currency: Currency;
    currencyRates: CurrencyRates;
    printMode?: boolean;
}
