import React, { useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  major: string;
}
export type AuthContextType = {
  user: User;
  login: (token: string) => void;
};

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    major: "",
  });

  const login = (token: string) => {};

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export default AuthContextProvider;
