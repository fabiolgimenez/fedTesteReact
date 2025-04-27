import type { User } from "User";
import { toNumber } from "./validationUtils";
import { getToken } from "./token";


const HOST = 'http://localhost:3000/'


export const getUsers = async () => {
    try {
        
      const response = await fetch(`${HOST}users`,{
        headers:{
            Authorization: getToken()
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do servidor:', error);
      throw error;
    }
  };
  


export const login = async (email:string, password:string) => {

    const payload = {
      email: email,
      senha: password,
    };
  
    try {
      const response = await fetch(`${HOST}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload), 
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
      return data; 
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      throw error;
    }
  };

  export const register = async (user:User) => {

    const payload = user;
  
    try {
      const response = await fetch(`${HOST}register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload), 
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
      return data; 
    } catch (error) {
      return error;
    }
  };


  export const deleteUserById = async (id:number) => {


    try {
      const response = await fetch(`${HOST}users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: getToken()
        },
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
      return data; 
    } catch (error) {
      return error;
    }
  };

  export const updateUser = async (user:User) => {
    try {
      const response = await fetch(`${HOST}users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json', 
          Authorization: getToken()
        },
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
      return data; 
    } catch (error) {
      return error;
    }
  };

  
  export const saveUser = async (user:User) => {
    try {
      user.cpf = toNumber(user.cpf!).toString();
      const response = await fetch(`${HOST}users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json', 
          Authorization: getToken()
        },
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
  
      return data; 
    } catch (error) {
      return error;
    }
  };