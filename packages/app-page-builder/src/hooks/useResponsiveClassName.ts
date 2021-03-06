import React from "react";
import { plugins } from "@webiny/plugins";
import kebabCase from "lodash/kebabCase";
import { PbRenderResponsiveModePlugin } from "../types";
import { PageBuilderContext, PageBuilderContextValue } from "../contexts/PageBuilder";

const useResponsiveClassName = () => {
    const {
        responsiveDisplayMode: { displayMode, setDisplayMode }
    } = React.useContext<PageBuilderContextValue>(PageBuilderContext);
    const ref = React.useRef();
    // Get "responsive-mode" plugins
    const responsiveModeConfigs = React.useMemo(() => {
        return plugins
            .byType<PbRenderResponsiveModePlugin>("pb-render-responsive-mode")
            .map(pl => pl.config);
    }, []);
    // Create resize observer
    const resizeObserver = React.useMemo(() => {
        return new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                handlerResize({ width, height });
            }
        });
    }, []);

    const pageElementRef = React.useCallback(node => {
        if (ref.current) {
            // Make sure to cleanup any events/references added to the last instance
            resizeObserver.disconnect();
        }
        if (node) {
            // Add resize observer
            resizeObserver.observe(node);
            // Save a reference to the node
            ref.current = node;
        }
    }, []);

    // Handle document resize
    const handlerResize = React.useCallback(
        ({ width }) => {
            let mode = "desktop";
            responsiveModeConfigs.forEach(config => {
                if (width <= config.minWidth) {
                    mode = config.displayMode;
                }
            });

            setDisplayMode(mode);
        },
        [responsiveModeConfigs]
    );

    return {
        pageElementRef,
        responsiveClassName: `webiny-pb-media-query--${kebabCase(displayMode)}`
    };
};

export default useResponsiveClassName;
