import React, { createContext, useState } from "react";
// Initiate Context
const UserContext = createContext();
// Provide Context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  return <UserContext.Provider value={{ user, setUser, loading, setLoading }}>{children}</UserContext.Provider>;
};

export default UserContext;
