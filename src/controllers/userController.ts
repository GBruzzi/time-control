import { Request, Response } from "express";
import client from "../database/db";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";

const userRepo = new userRepository();

export const getUsers = async (_: Request, res: Response) => {
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

export const getUser = async (req: Request, res: Response) => {
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
  confirmSenha?: string;
}

// Cadastrar usuário
export const addUser = async (req: Request, res: Response) => {
  // dessestruturar req
  const {
    name,
    numero_matricula,
    email,
    senha,
    confirmSenha,
  }: UserRequestBody = req.body;

  const userExists = await userRepo.findByEmail(email);

  if (userExists) {
    return res.status(400).json({ error: "This email already exists" });
  }

  if (senha != confirmSenha) {
    return res.status(400).json({ error: "As senhas precisam ser iguais" });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  // criar usuario
  const user = await userRepo.create(
    {
      name,
      numero_matricula,
      email,
      senha: senhaHash,
    },
    res
  );

  res.json(user);
};

interface logUser {
  numero_matricula: string;
  senha: string;
}

// validar o login do usuario
export const logUser = async (req: Request, res: Response ) => {
  const {numero_matricula , senha }: logUser = req.body
  
  try {
    // Consulta SQL para obter o hash da senha a partir do banco de dados
    const query = 'SELECT senha FROM usuario WHERE numero_matricula = $1';
    const result = await client.query(query, [numero_matricula]);

    if (result.rows.length === 1) {
      const hash = result.rows[0].senha;

      // Verificar se a senha fornecida corresponde ao hash no banco de dados
      const senhaCorrespondente = await bcrypt.compare(senha, hash);

      if (senhaCorrespondente) {
        // Credenciais corretas - usuário logado com sucesso
        res.status(200).json({ message: 'Login bem-sucedido' });
      } else {
        // Credenciais incorretas - senha inválida
        res.status(401).json({ message: 'Senha inválida' });
      }
    } else {
      // Credenciais incorretas - usuário não existe
      res.status(401).json({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    // Lidar com erros
    console.error('Erro ao consultar o banco de dados:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  const { name, numero_matricula, email, senha }: UserRequestBody = req.body;
  const { id } = req.params;
  try {
    const q =
      "UPDATE usuario SET name = $1, numero_matricula = $2, email = $3, senha= $4 WHERE id = $5";

    const values = [name, numero_matricula, email, senha, id];

    // Use o cliente PostgreSQL para executar a consulta
    await client.query(q, values);

    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return res.status(500).json("Ocorreu um erro ao atualizar o usuário.");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
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
