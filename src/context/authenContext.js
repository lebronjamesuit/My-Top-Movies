
import {createContext, useState } from "react";


const AuthenContext = createContext();

function Provider ( {children}){

    const [userLogged, setUserLogged] = useState("");
    
    const valueToShare = {
        userLogged,
        chaneUserLogged: (newUser) => {
            setUserLogged(newUser);
            console.log("call back at authenContext.js ");
        }
    };
    
    return (
        <AuthenContext.Provider value={valueToShare} >
            {children}
        </AuthenContext.Provider>

    );

}

export {Provider} ;
export default AuthenContext;