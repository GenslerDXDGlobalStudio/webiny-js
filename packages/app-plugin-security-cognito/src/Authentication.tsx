// TODO remove
// @ts-nocheck
import React from "react";
import { CircularProgress } from "@webiny/ui/Progress";
import { Authenticator } from "./cognito/Authenticator";
import SignInState from "./cognito/states/SignIn";
import SignedInState from "./cognito/states/SignedIn";
import RequireNewPasswordState from "./cognito/states/RequireNewPassword";
import ForgotPasswordState from "./cognito/states/ForgotPassword";
import SetNewPasswordState from "./cognito/states/SetNewPassword";

import SignIn from "./views/SignIn";
import RequireNewPassword from "./views/RequireNewPassword";
import ForgotPassword from "./views/ForgotPassword";
import SetNewPassword from "./views/SetNewPassword";

export const Authentication = ({ children, getIdentityData }) => {
    return (
        <Authenticator getIdentityData={getIdentityData}>
            {({ checkingUser, ...authProps }) =>
                checkingUser ? (
                    <CircularProgress />
                ) : (
                    <>
                        <SignInState {...authProps}>
                            <SignIn />
                        </SignInState>
                        <RequireNewPasswordState {...authProps}>
                            <RequireNewPassword />
                        </RequireNewPasswordState>
                        <ForgotPasswordState {...authProps}>
                            <ForgotPassword />
                        </ForgotPasswordState>
                        <SetNewPasswordState {...authProps}>
                            <SetNewPassword />
                        </SetNewPasswordState>
                        <SignedInState {...authProps}>{children}</SignedInState>
                    </>
                )
            }
        </Authenticator>
    );
};
