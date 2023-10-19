import {Request, Response} from 'express';
import client from "../database/db";
import { userRepository } from '../repositories/userRepository';

const userRepo = new userRepository();


export const getUsers = async (_:Request, res:Response) => {
  try {
    const q = "SELECT * FROM usuario";
    const result = await client.query(q);
    const users = result.rows; // Apenas os dados dos usuários

    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error);
    return res
      .status(500)
      .json({ error: "Erro ao consultar o banco de dados." });
  }
};

export const getUser = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const q = "SELECT * from usuario WHERE id = $1";

    const values = [id];

    await client.query(q, values);

    const result = await client.query(q, values);

    const user = result.rows;
    return res.status(200).json(user);
  } catch (error) {
    console.log("Erro ao consultar o banco de dados:", error);
    return res
      .status(500)
      .json({ error: "Erro ao consultar o banco de dados." });
  }
};

// Criar interface para objeto dessestruturado
export interface UserRequestBody {
  name: string;
  numero_matricula: string;
  email: string;
  senha: string;
  confirmSenha?:string;
}

export const addUser = async (req:Request, res:Response) => {
  // dessestruturar req
  const { name, numero_matricula, email, senha }: UserRequestBody = req.body;

  const userExists = await userRepo.findByEmail(email);

    if (userExists) {
      return res.status(400).json({ error: 'This email already exists' });

    }

    
    
    // criar usuario
    const user = await userRepo.create( {
      name, numero_matricula, email, senha: senha
    }, res)


    res.json(user)
 
};

export const updateUser = async (req:Request, res:Response) => {
  const { name, numero_matricula, email, senha } : UserRequestBody = req.body;
  const { id } = req.params;
  try {
    const q =
      "UPDATE usuario SET name = $1, numero_matricula = $2, email = $3, senha= $4, WHERE id = $5";

    const values = [name, numero_matricula, email, senha, id];

    // Use o cliente PostgreSQL para executar a consulta
    await client.query(q, values);

    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return res.status(500).json("Ocorreu um erro ao atualizar o usuário.");
  }
};

export const deleteUser = async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const q = "DELETE FROM usuario WHERE id = $1";

    const values = [id];

    // Usar o cliente PostgreSQL para executar a consulta
    await client.query(q, values);

    return res.status(200).json("Usuário deletado com sucesso.");
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    return res.status(500).json("Ocorreu um erro ao deletar o usuário.");
  }
};
