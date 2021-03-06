import { ErrorResponse } from "@webiny/handler-graphql/responses";
import googleTagManagerSettings from "./googleTagManagerSettings.model";

type SettingsContext = any;

const emptyResolver = () => ({});

export default () => [
    {
        type: "context",
        name: "context-models-google-tag-manager",
        apply({ models }) {
            models.GoogleTagManagerSettings = googleTagManagerSettings({
                createBase: models.createBase
            });
        }
    },
    {
        name: "graphql-schema-google-tag-manager",
        type: "graphql-schema",
        schema: {
            typeDefs: /* GraphQL */ `
                type GtmError {
                    code: String
                    message: String
                    data: JSON
                }

                type GtmSettings {
                    enabled: Boolean
                    code: String
                }

                type GtmSettingsResponse {
                    data: GtmSettings
                    error: GtmError
                }

                input GtmSettingsInput {
                    enabled: Boolean
                    code: String
                }

                type GtmQuery {
                    getSettings: GtmSettingsResponse
                }

                type GtmMutation {
                    updateSettings(data: GtmSettingsInput): GtmSettingsResponse
                }

                extend type Query {
                    googleTagManager: GtmQuery
                }

                extend type Mutation {
                    googleTagManager: GtmMutation
                }
            `,
            resolvers: {
                Query: {
                    googleTagManager: emptyResolver
                },
                Mutation: {
                    googleTagManager: emptyResolver
                },
                GtmQuery: {
                    getSettings: async (_, args, context: SettingsContext) => {
                        try {
                            const data = await context.settingsManager.getSettings(
                                "google-tag-manager"
                            );
                            return { data };
                        } catch (err) {
                            return new ErrorResponse(err);
                        }
                    }
                },
                GtmMutation: {
                    /*updateSettings: hasPermission("pb:settings")(
                        /!*resolveUpdateSettings(({ models }) => models.GoogleTagManagerSettings)*!/
                    )*/
                }
            }
        }
    }
];
