import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});

function AuthProvider({children}){
const [user, serUser] = useState(null);

    function signIn(email, password){
        alert('logado com sucesso' + email, password);
    }

    return(
        <AuthContext.Provider
        value={{signed: !!user,
             user,
             signIn
             
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
