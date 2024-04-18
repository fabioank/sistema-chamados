import '../SignIn/signin.css';
import logo from '../../assets/logo.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== ''){

        }else{
            alert("Por favor digite todos os campos necessarios para realizar o cadastro");
        }

    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema de chamados'></img>
                </div>

                <form onSubmit={handleSubmit}> 
                    <h1>Registrar</h1>

                    <input 
                    type='text' 
                    placeholder='Seu nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></input>

                    <input 
                    type='text' 
                    placeholder='email@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <input 
                    type='password' 
                    placeholder='***********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>

                    <button type='submit'>Cadastrar</button>
                </form>

                <Link to='/'>Já possui uma conta? Faça login</Link>
                
            </div>
        </div>
    );
}