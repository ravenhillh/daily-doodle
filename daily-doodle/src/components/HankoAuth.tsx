import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { register, Hanko } from "@teamhanko/hanko-elements";

const hankoApi = process.env.HANKO_API as string;

export default function HankoAuth() {
  const navigate = useNavigate();

  const hanko = useMemo(() => new Hanko(hankoApi), []);

  const generateUserID = () => Math.random().toString(36).substring(2, 10);

  const redirectAfterLogin = useCallback(() => {
    // redirect to a page in your application
    localStorage.setItem("loggedIn", "true");
    if (!localStorage.getItem("u_id")) {
      localStorage.setItem("u_id", generateUserID());
    }
    navigate("/");
  }, [navigate]);

  useEffect(
    () =>
      hanko?.onSessionCreated(() => {
        //succesfully logged in
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
      console.log(error);
    });
  }, []);

  return <hanko-auth />;
}
