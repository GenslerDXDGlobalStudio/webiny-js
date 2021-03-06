import { CmsContext, ElasticsearchQueryBuilderPlugin } from "../../../../../types";
import WebinyError from "@webiny/error";

interface OperatorPlugins {
    [operator: string]: ElasticsearchQueryBuilderPlugin;
}

export const operatorPluginsList = (context: CmsContext): OperatorPlugins => {
    return context.plugins
        .byType<ElasticsearchQueryBuilderPlugin>("cms-elastic-search-query-builder")
        .reduce((plugins, plugin) => {
            if (plugins[plugin.operator]) {
                throw new WebinyError(
                    "There is a ElasticsearchQueryBuilderPlugin defined for the operator.",
                    "PLUGIN_ALREADY_EXISTS",
                    {
                        operator: plugin.operator,
                        name: plugin.name || "unknown"
                    }
                );
            }
            plugins[plugin.operator] = plugin;

            return plugins;
        }, {} as OperatorPlugins);
};
