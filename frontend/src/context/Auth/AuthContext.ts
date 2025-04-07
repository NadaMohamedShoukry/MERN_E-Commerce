import { createContext, useContext } from "react";

interface AuthContextType {
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myOrders : any[];
  error:string;
  login: (email: string, token: string) => void;
  logout: () => void;
  getMyOrders : ()=>void;
}

export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  isAuthenticated: false,
  myOrders:[],
  error:"",
  login: () => {},
  logout: () => {},
  getMyOrders:()=>{}
});

//Create a custom hook useAuth
//the returned context value is an object of username and token or null.

export const useAuth = () => useContext(AuthContext);

// createContext =>	Creates a container for shared data
// AuthContextType =>	Defines the shape of the context value
// AuthContext	=> The actual context object to be used with a provider
// useAuth() =>	A custom hook that reads the current context value easily
