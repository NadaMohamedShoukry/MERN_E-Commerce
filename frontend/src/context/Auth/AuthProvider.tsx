import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/baseURL";

const EMAIL_KEY = "email";
const TOKEN_KEY = "token";
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem(EMAIL_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error ,setError]=useState("")
  const [myOrders ,setMyOrders]=useState([]);

  //!! => true or not
  const isAuthenticated = !!token;

  const login = (email: string, token: string) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setEmail(null);
    setToken(null);
  };

  const getMyOrders = async()=>{
    try {
          
          const response = await fetch(`${BASE_URL}/user/my-orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
      
          });
       
          if (!token) {
            setError("Incorrect Token!");
            return;
          }
    
          if (!response.ok) {
            setError("Unable to connect! ");
            return;
          }
           const data = await response.json();
           setMyOrders(data);
        } catch (error) {
          console.error(error);
          setError("Something went wrong! try again later");
        }
  }
  return (
    <AuthContext.Provider
      value={{ email, token, isAuthenticated,error,myOrders, login, logout,getMyOrders }}
    >
      {/* children is the application wraped inside the provider */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
