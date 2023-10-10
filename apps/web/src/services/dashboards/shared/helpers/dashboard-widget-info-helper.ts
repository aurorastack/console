import { cloneDeep, isEmpty, isEqual } from 'lodash';

import { isObjectEqual } from '@cloudforet/core-lib';

import type {
    DashboardLayoutWidgetInfo,
    InheritOptions, UpdatableWidgetInfo,
    WidgetConfig, WidgetFiltersMap,
    WidgetOptions,
} from '@/services/dashboards/widgets/_configs/config';

export const getUpdatedWidgetInfo = (widgetConfig: WidgetConfig, mergedWidgetInfo: Partial<DashboardLayoutWidgetInfo>): UpdatableWidgetInfo => {
    const configInheritOptions = widgetConfig.inherit_options ?? {};
    const configWidgetOptions = widgetConfig.options ?? {};
    const updatedInheritOptions: InheritOptions = cloneDeep(mergedWidgetInfo.inherit_options) ?? {};
    const updatedWidgetOptions: WidgetOptions = cloneDeep(mergedWidgetInfo.widget_options) ?? {};

    Object.entries(updatedInheritOptions).forEach(([key, inheritOption]) => {
        if (isObjectEqual(inheritOption, configInheritOptions[key])) {
            delete updatedInheritOptions[key];
        }
    });
    Object.entries(updatedWidgetOptions).forEach(([key, val]) => {
        // filter case
        if (key.startsWith('filters.')) {
            if (!val) return;
            Object.entries(val).forEach(([filterKey, filterVal]) => {
                if (isObjectEqual(filterVal, configWidgetOptions.filters?.[filterKey])) {
                    delete (updatedWidgetOptions.filters as WidgetFiltersMap)[filterKey];
                }
            });
            // other widget option case
        } else if (isEqual(val, configWidgetOptions[key])) {
            delete updatedWidgetOptions[key];
        }
    });

    return {
        title: mergedWidgetInfo.title,
        inherit_options: isEmpty(updatedInheritOptions) ? undefined : updatedInheritOptions,
        widget_options: isEmpty(updatedWidgetOptions) ? undefined : updatedWidgetOptions,
        schema_properties: mergedWidgetInfo.schema_properties?.length ? mergedWidgetInfo.schema_properties : undefined,
    };
};
