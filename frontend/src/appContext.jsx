import { useState } from "react";
import { UserContext } from "./userContext";

const AppContext = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AppContext;
