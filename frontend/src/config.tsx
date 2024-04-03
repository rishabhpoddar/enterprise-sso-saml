import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import Multitenancy from "supertokens-auth-react/recipe/multitenancy";
import { ReactComponent as MicrosoftLogo } from './assets/images/microsoft.svg';

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

export const styleOverride = `
[data-supertokens~=tenants-link] {
    margin-top: 8px;
}
`;

export const SuperTokensConfig = {
    appInfo: {
        appName: "SuperTokens Demo App",
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    usesDynamicLoginMethods: true,
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [{
                    id: "boxy-saml",
                    name: "",
                    buttonComponent: (props: { name: string }) => {
                        if (props.name === "Microsoft Login") {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                    <div style={{
                                        width: "200px",
                                        cursor: "pointer",
                                        border: "1px",
                                        paddingTop: "5px",
                                        paddingBottom: "5px",
                                        borderRadius: "5px",
                                        borderStyle: "solid",
                                        flexDirection: "row",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                    }}>
                                        <MicrosoftLogo style={{
                                            height: "20px"
                                        }} />
                                        <div style={{
                                            flex: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            {props.name}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div style={{
                                cursor: "pointer",
                                border: "1px",
                                paddingTop: "5px",
                                paddingBottom: "5px",
                                borderRadius: "5px",
                                borderStyle: "solid"
                            }}>{props.name}</div>
                        )
                    }
                }]
            },
            style: styleOverride,
        }),
        Session.init({
            onHandleEvent: (event) => {
                // This is done to remove the saved tenantId so that when the user next
                // visits the login page, they see the tenant drop down.
                if (["SIGN_OUT", "UNAUTHORISED", "SESSION_CREATED"].includes(event.action)) {
                    localStorage.removeItem("tenantId");
                }
            },
        }),
        Multitenancy.init({
            override: {
                functions: (oI) => {
                    return {
                        ...oI,
                        getTenantId: async () => {
                            const tenantIdInStorage = localStorage.getItem("tenantId");
                            return tenantIdInStorage === null ? undefined : tenantIdInStorage;
                        },
                    };
                },
            },
        }),
    ],
};

export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/multitenancy/introduction",
};

export const PreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI];
