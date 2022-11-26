import React, { createContext, useState } from "react";
// Initiate Context
const UserContext = createContext();
// Provide Context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
