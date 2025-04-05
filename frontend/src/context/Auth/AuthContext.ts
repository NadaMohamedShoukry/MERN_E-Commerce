import { createContext, useContext } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  login: (email: string, token: string) => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  login: () => {},
  isAuthenticated: false,
});

//Create a custom hook useAuth
//the returned context value is an object of username and token or null.

export const useAuth = () => useContext(AuthContext);

// createContext =>	Creates a container for shared data
// AuthContextType =>	Defines the shape of the context value
// AuthContext	=> The actual context object to be used with a provider
// useAuth() =>	A custom hook that reads the current context value easily
