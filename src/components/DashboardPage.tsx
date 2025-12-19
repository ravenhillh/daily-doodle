import { useState, useEffect } from "react";
import { Hanko } from "@teamhanko/hanko-elements";
import Nav from "./Nav";

import HankoProfile from "./HankoProfile";

const hankoApi = "https://a3443068-44a3-4f89-ac6a-8ff884ef0fc4.hanko.io";

export default function Dashboard() {
  //   const hanko = useMemo(() => new Hanko(hankoApi), []);
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => setHanko(new Hanko(hankoApi)), []);
  useEffect(() => {
    hanko?.getUser().then((user) => {
      console.log("User profile:", user); // Log user Profile
      console.log(user.emails?.[0]?.address);
      console.log(user.user_id);
    });
  }, [hanko]);

  return (
    <div>
      <Nav />
      <HankoProfile />
    </div>
  );
}
