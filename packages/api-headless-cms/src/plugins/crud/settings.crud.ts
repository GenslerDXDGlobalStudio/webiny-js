import { ContextPlugin } from "@webiny/handler/types";
import * as utils from "../../utils";
import { CmsContext, CmsSettingsContext, CmsSettingsPermission, CmsSettings } from "../../types";

const SETTINGS_SECONDARY_KEY = "settings";

export default {
    type: "context",
    name: "context-settings-crud",
    apply(context) {
        const { db } = context;

        const PK_SETTINGS = () => `${utils.createCmsPK(context)}#SETTINGS`;

        const checkPermissions = (): Promise<CmsSettingsPermission> => {
            return utils.checkPermissions(context, "cms.settings");
        };

        const settingsGet = async () => {
            const [[settings]] = await db.read<CmsSettings>({
                ...utils.defaults.db(),
                query: { PK: PK_SETTINGS(), SK: SETTINGS_SECONDARY_KEY }
            });

            return settings;
        };

        const settings: CmsSettingsContext = {
            contentModelLastChange: new Date(),
            noAuth: () => {
                return {
                    get: settingsGet
                };
            },
            get: async (): Promise<CmsSettings | null> => {
                await checkPermissions();
                return settingsGet();
            },
            updateContentModelLastChange: async (): Promise<void> => {
                const updatedDate = new Date();

                await db.update({
                    ...utils.defaults.db(),
                    query: {
                        PK: PK_SETTINGS(),
                        SK: SETTINGS_SECONDARY_KEY
                    },
                    data: {
                        lastContentModelChange: updatedDate
                    }
                });

                context.cms.settings.contentModelLastChange = updatedDate;
            },
            getContentModelLastChange: async (): Promise<Date> => {
                const settings = await settingsGet();
                if (!settings.contentModelLastChange) {
                    return new Date();
                }
                try {
                    return new Date(settings.contentModelLastChange);
                } catch (ex) {
                    console.log({
                        error: {
                            message: ex.message,
                            code: ex.code || "COULD_NOT_PARSE_CONTENT_MODEL_LAST_CHANGE",
                            data: ex
                        }
                    });
                }
                return new Date();
            }
        };
        context.cms = {
            ...(context.cms || ({} as any)),
            settings
        };
    }
} as ContextPlugin<CmsContext>;
