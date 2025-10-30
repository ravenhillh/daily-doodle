import { useState, useEffect } from "react";
import { Hanko } from "@teamhanko/hanko-elements";

import HankoProfile from "./HankoProfile";

const hankoApi = process.env.HANKO_API as string;

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
      <HankoProfile />
    </div>
  );
}
