import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "hanko-auth": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
