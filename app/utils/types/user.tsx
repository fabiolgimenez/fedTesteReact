
declare module "User" {
    import React from "react"
    export interface User  {
        id?:number,
        nome: string,
        sobrenome: string,
        email:string,
        cpf?:string,
        senha?:string 
    }
    export const User: React.FC<User>;
}