import { useState, createContext, useEffect } from "react";
import {auth, db} from '../services/firebaseConnection'
import { createUserWithEmailAndPassword} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext({});

function AuthProvider({children}){
const [user, setUser] = useState(null);
const [loadingAuth, setLoadingAuth] = useState(false);

    function signIn(email, password){
        alert('logado com sucesso' + email, password);
    }

    async function signUp(email, password, name){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) =>{
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null
            }) 
            .then(() =>{
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);

                setLoadingAuth(false);
            })

        })
        .catch(() =>{
            console.log("Erro ao criar uma nova conta");
        })


    }

    return(
        <AuthContext.Provider
        value={{signed: !!user,
             user,
             signIn,
             signUp,
             loadingAuth
             
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
