
import React, { useState } from 'react';
import { Link } from 'react-router';
import { register } from '~/utils/http';
import { cpfFomat, toNumber, validateCpf, validateEmail } from '~/utils/validationUtils';

const RegisterForm = () => {
  const [nome, setnome] = useState('');
  const [sobrenome, setsobrenome] = useState('');
  const [senha, setsenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validação básica
    if (senha !== confirmsenha) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!validateEmail(email,confirmEmail)) {
      setError('Os emails não coincidem.');
      return;
    }

    if(!validateCpf(cpf)) {
        setError('CPF inválido.');
        return;
    }

    // Adicione validação mais robusta para o email e CPF aqui (expressões regulares, etc.)

    // Simulação de envio de dados (substitua por uma chamada à API)
    console.log({
      nome,
      sobrenome,
      senha,
      email,
      cpf,
    });
    const resp = await register({nome,sobrenome,senha,email,cpf:toNumber(cpf).toString()});
    console.log(resp);
    if(resp.severity === 'ERRO'){
      setError(resp.detail);
    }else{
      alert('Cadastro realizado com sucesso!'); 
      setError(''); 
    }
 
  };

  const isDisabled =
    !nome ||
    !sobrenome ||
    !senha ||
    !confirmsenha ||
    !email ||
    !confirmEmail ||
    !cpf;

  return (
    <div className="container">
      <div className="login-box">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setnome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setsobrenome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="email"
            placeholder="Confirmar Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <input
            type="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setsenha(e.target.value)}
          />
          <input
            type="senha"
            placeholder="Confirmar Senha"
            value={confirmsenha}
            onChange={(e) => setConfirmsenha(e.target.value)}
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(cpfFomat(e.target.value))}
            maxLength={14}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isDisabled}>
            Cadastrar
          </button>
          <hr />
          <Link to={".."}>Voltar</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

