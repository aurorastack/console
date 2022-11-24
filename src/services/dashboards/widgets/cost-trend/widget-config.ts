import type { WidgetConfig } from '@/services/dashboards/widgets/config';
import { CHART_TYPE, GROUP_BY } from '@/services/dashboards/widgets/config';

const costTrendWidgetConfig: WidgetConfig = {
    widget_config_id: 'costTrend',
    base_configs: [{ config_id: 'baseTrend' }],
    title: 'Cost Trend',
    labels: ['Cost'],
    description: {
        translation_id: 'DASHBOARDS.WIDGET.COST_TREND.DESC',
        preview_image: 'xxx.png',
    },
    scopes: ['PROJECT', 'WORKSPACE'],
    theme: {
        inherit: true,
    },
    sizes: ['lg', 'full'],
    widget_options: {
        granularity: 'MONTHLY',
        enable_legend: false,
        chart_type: CHART_TYPE.LINE,
    },
    widget_options_schema: {
        type: 'object',
        properties: {
            group_by: {
                type: 'string',
                enum: Object.values(GROUP_BY),
            },
        },
        required: ['group_by'],
    },
};

export default costTrendWidgetConfig;
