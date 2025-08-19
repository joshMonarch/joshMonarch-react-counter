import { useState } from "react";
import { Alert } from "./Alert";
import { SecondsCounter } from "./SecondsCounter";

export const App = () => {
  const [shared, setShared] = useState(0);
  return (
    <>
      <Alert counter={shared} threshold={10} />
      <SecondsCounter seconds={1} threshold={10} setShared={setShared} />
    </>
  );
};
