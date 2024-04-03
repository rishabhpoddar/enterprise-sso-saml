import { ReactComponent as MicrosoftLogo } from './assets/images/microsoft.svg';

export default function MicrosoftLoginButton() {
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
                    Microsoft Login
                </div>
            </div>
        </div>
    );
}
