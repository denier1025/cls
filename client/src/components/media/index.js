import React from "react";
import MediaQuery from "react-responsive";
import Mobile from "./mobile";
import Desktop from "./desktop";
import App from "../../containers/app";

export default function Media() {
  return (
    <MediaQuery minWidth={1024}>
      {matches => {
        if (matches) {
          return (
            <Desktop>
              <App appType={"desktop"} hamButtonFlag={true} />
            </Desktop>
          );
        } else {
          return (
            <Mobile>
              <App appType={"mobile"} hamButtonFlag={false} />
            </Mobile>
          );
        }
      }}
    </MediaQuery>
  );
}
