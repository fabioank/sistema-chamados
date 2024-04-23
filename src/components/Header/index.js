import  './header.css';
import avatarImg from '../../assets/avatar.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthProvider, { AuthContext } from '../../contexts/auth';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Header(){

    const { user} = useContext(AuthContext);

    return(
        <div className='sidebar'>
            <div>
            <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt='Foto do usuario'></img>
            </div>

            <Link to='/dashboard'>
            <FiHome color='#FFF' size={24}></FiHome>
            Chamados
            </Link>

            <Link to='/customers'>
            <FiUser color='#FFF' size={24}></FiUser>
            Clientes
            </Link>

            <Link to='/profile'>
            <FiSettings color='#FFF' size={24}></FiSettings>
            Perfil
            </Link>

        </div>
    );
}