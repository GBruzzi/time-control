import { Request, Response } from "express";
import client from "../database/db";

export const getSubjects = async (_: Request, res: Response) => {
  try {
    const q = "SELECT * FROM subjects";
    const result = await client.query(q);
    const subjects = result.rows; // Apenas os dados dos usuários

    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Erro ao consultar o banco de dados:", error);
    return res
      .status(500)
      .json({ error: "Erro ao consultar o banco de dados." });
  }
};

export const getSubject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const q = "SELECT * from subjects WHERE id = $1";

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

export const addSubject = async (req: Request, res: Response) => {
  try {
    const q = "INSERT INTO subjects(name, codigo) VALUES($1, $2)";

    const {
      name,
      codigo,
    }: {
      name: string;
      codigo: string;
    } = req.body;

    const values = [name, codigo];

    // Use o cliente PostgreSQL para executar a consulta
    await client.query(q, values);

    return res.status(200).json("Matéria criado com sucesso.");
  } catch (err) {
    console.error("Erro ao adicionar matéria:", err);
    return res.status(500).json("Ocorreu um erro ao adicionar a matéria.");
  }
};


export const updateSubject = async (req: Request, res: Response) => {
  const { name, codigo} : {name:string, codigo:string} = req.body;
  const { id } = req.params;
  try {
    const q =
      "UPDATE subjects SET name = $1, codigo = $2 WHERE id = $3";

    const values = [name,codigo, id];

    // Use o cliente PostgreSQL para executar a consulta
    await client.query(q, values);

    return res.status(200).json("Matéria atualizado com sucesso.");
  } catch (err) {
    console.error("Erro ao atualizar a matéria:", err);
    return res.status(500).json("Ocorreu um erro ao atualizar a matéria.");
  }
};


export const deleteSubject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const q = "DELETE FROM subjects WHERE id = $1";

    const values = [id];

    // Usar o cliente PostgreSQL para executar a consulta
    await client.query(q, values);

    return res.status(200).json("Matéria deletado com sucesso.");
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    return res.status(500).json("Ocorreu um erro ao deletar a matéria.");
  }
};