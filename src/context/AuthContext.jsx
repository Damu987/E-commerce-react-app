import { createContext,useContext, useEffect, useState } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }){
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("auth"));
        if(storedUser){
            setAuth(storedUser);
        }
    }, []);
    
    const login = (userData) => {
        setAuth(userData);
        localStorage.setItem("auth", JSON.stringify(userData));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    }


    return(
        <AuthContext.Provider value={{ auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);