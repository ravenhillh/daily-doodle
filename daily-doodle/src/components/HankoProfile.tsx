import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";

const hankoApi = process.env.HANKO_API as string;

export default function HankoProfile() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
      console.log(error);
    });
  }, []);

  return <hanko-profile />;
}
