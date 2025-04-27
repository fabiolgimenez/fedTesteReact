import React, { useState, useEffect } from 'react';
import type { User } from 'User';
import { deleteUserById, getUsers, saveUser, updateUser } from '~/utils/http';
import { cpfFomat, gerarCpf, toNumber } from '~/utils/validationUtils';



const navigateLogin = ()=>{
    
    window.location.href = '/login';
}

const Main = () => {
  const [users, setUsers] = useState(Array<User>);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm,setEditForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({ nome: '', sobrenome: '', email: '' }); 
  const [selectedUser, setSelectedUser] = useState<User | null>(null); 

  useEffect(() => {
    (window as any)['gerarCpf'] = gerarCpf;
    const fetchUsers = async () => {
      try{
        const users = await getUsers();
        console.log(users);
        if(users.error){
          navigateLogin();
        }else{
          setUsers(users);
        }
        
      }catch(err){
        console.log(err);
      }
      
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setEditForm(true);
    setShowAddForm(true);
    setNewUser({id:0, nome: '', sobrenome: '', email: '' });
  };

  const handleEditUser = (user:any) => {
    setSelectedUser(user);
    setNewUser(user); 
    setShowAddForm(true);
    setEditForm(false);
  };

  const handleDeleteUser = async (userId:any) => {
    const loggedEMail = JSON.parse(atob(sessionStorage.getItem('Authorization')!)).email
    if(users.filter(u=>u.email===loggedEMail)[0].id === userId){
      window.alert('Não é possível excluir usuário logado...');
    }else{
      const resp = await deleteUserById(userId);
      if(resp.error){
        alert(`Erro ao excluir usuário...${resp.error}`);
      }else{
        setUsers(users.filter(user => user.id !== userId));
      }
      
    }
  };

  const handleSaveUser = async () => {
    if (selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id ? { ...newUser, id: selectedUser.id } : user
      );
       const resp =  await updateUser(selectedUser);
       if(resp.severity){
        alert(`Erro ao atualizar usuário...${resp.detail}`);
       }else{
        setUsers(updatedUsers);
        setSelectedUser(null);
       }
      
    } else {
      const resp = await saveUser(newUser);
      if(resp.severity){
        alert(`Erro ao salvar usuário...${resp.detail||resp.where}`);
      }else{
        setUsers([...users, { ...newUser, id: resp.id }]); 
      }

    }

    setShowAddForm(false);
    setEditForm(false);
   //setNewUser({ nome: '', sobrenome: '', email: '' }); // Limpa o formulário
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewUser({ nome: '', sobrenome: '', email: '' }); 
    setSelectedUser(null); 
    setEditForm(false);
  };

  return (
    <div className="container">
      <a className='logout' onClick={()=>{
        sessionStorage.removeItem('Authorization');
        window.location.href = '/login';
      }}>Logout</a>
      <h2>Lista de Usuários</h2>
      <button onClick={handleAddUser}>Adicionar Usuário</button>

      {showAddForm && (
        <div className="login-box abs">
          <h3>{selectedUser ? 'Editar Usuário' : 'Adicionar Usuário'}</h3>
          <form>
            <input
              type="text"
              placeholder="Nome"
              value={newUser.nome}
              onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              value={newUser.sobrenome}
              onChange={(e) => setNewUser({ ...newUser, sobrenome: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <input
              type="cpf"
              placeholder="CPF"
              value={newUser.cpf}
              onChange={(e) => setNewUser({ ...newUser, cpf:  cpfFomat(e.target.value) })}
              maxLength={14}
            />
       
            {editForm && <input
              type="senha"
              placeholder="Senha"
              value={newUser.senha}
              onChange={(e) => setNewUser({ ...newUser, senha:  e.target.value })}
            />}
            <button type="button" onClick={handleSaveUser}>
              Salvar
            </button>
            <button type="button" onClick={handleCancelAdd}>
              Cancelar
            </button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users? users.map(user => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.sobrenome}</td>
              <td>{user.email}</td>
              <td>{user.cpf}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          )):<p>Carregando...</p>}
        </tbody>
      </table>
    </div>
  );
};

export default Main;