import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({username:null,token:null,login:()=>{}});

//Create a custom hook useAuth
//the returned context value is an object of username and token or null.

export const useAuth = () => useContext(AuthContext);

// createContext =>	Creates a container for shared data
// AuthContextType =>	Defines the shape of the context value
// AuthContext	=> The actual context object to be used with a provider
// useAuth() =>	A custom hook that reads the current context value easily
