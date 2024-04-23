import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import Header from "../../components/Header";

export default function Dashboard(){

    const { logOut} = useContext(AuthContext);

     async function handleLogout(){
        await logOut();
    }

    return(
        <div>

            <Header/>
            <h1>Default dashboard</h1>
            <button onClick={handleLogout}>Sair da conta</button>
        </div>
    );
}