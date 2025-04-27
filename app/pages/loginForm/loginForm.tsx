import React, { useState } from 'react';
import { Link } from 'react-router';
import { login } from '~/utils/http';

   const LoginForm = () => {
     const [username, setUsername] = useState('root@root.com');
     const [password, setPassword] = useState('1234');
     const [error, setError] = useState('');

     const loginHandle = async (e: { preventDefault: () => void; }) => {
       e.preventDefault();

       // Simulação de login (substitua por uma chamada à sua API)
       if (username && password ) {
         const response = await login(username,password);
         console.log(response);
         if(response.status === 401 || !response.token){
          setError('Usuário ou senha incorretos.');
         }else{
          sessionStorage.setItem('Authorization',response.token);
          location.href = '/';
         }
       } else {
         setError('Usuário ou senha incorretos.');
       }
     };


     const isDisabled = !username || !password;

     return (
       <div className="container">
         <div className="login-box">
         <h3>Aplicacao React,Node.js e Postgres</h3>
           <h2>Login</h2>
           <form onSubmit={loginHandle}>
             <input
               type="text"
               placeholder="Usuário"
               value={username}
               onChange={(e) => {setUsername(e.target.value)}}
             />
             <input
               type="password"
               placeholder="Senha"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
             {error && <p className="error-message">{error}</p>}
             <button type="submit" disabled={isDisabled}>
               Entrar
             </button>
           </form>
           <hr />
           <Link to={{
            pathname: '/register',
           }}>Cadastrar</Link>
         </div>
       </div>
     );
   };

   export default LoginForm;