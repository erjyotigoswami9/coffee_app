import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext() ;

function AuthProvider({children}){
    let [cartArr, setCartArr] = useState([]) ;
    let [ showCart , setShowCart] = useState(false) ;
    let [totalPrice , seTotalPrice] = useState(0) ;

    return <AuthContext.Provider value={{cartArr, setCartArr , showCart , setShowCart}} >{children}</AuthContext.Provider>
}

export {AuthProvider} ;