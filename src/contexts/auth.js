import { useState, createContext, useEffect } from "react";
import {auth, db} from '../services/firebaseConnection'
import { createUserWithEmailAndPassword
    , signInWithEmailAndPassword
    , signOut
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

function AuthProvider({children}){
const [user, setUser] = useState(null);
const [loadingAuth, setLoadingAuth] = useState(false);
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() =>{
    async function loadUser(){
        const storageUser = localStorage.getItem("ticketsPRO")

        if(storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);

        }
        setLoading(false);
    }
    loadUser();
}, [])

    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then( async(value) =>{
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem-vindo(a) de volta!");
            navigate("/dashboard");
        })
        .catch((error) =>{
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops! Nome de usuario ou senha incorretos:(");
        })
 

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
                storageUser(data);
                toast.success("Seja bem-vindo ao sistema");
                navigate("/dashboard");
            })

        })
        .catch(() =>{
            console.log("Erro ao criar uma nova conta");
        })


    }

    function storageUser(data){
        localStorage.setItem("@ticketsPRO", JSON.stringify(data));
    }

    async function logOut(){
        await signOut(auth);
        localStorage.removeItem("@ticketsPRO");
        setUser(null);
    }

    return(
        <AuthContext.Provider
        value={{signed: !!user,
             user,
             signIn,
             signUp,
             logOut,
             loadingAuth,
             loading
             }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
