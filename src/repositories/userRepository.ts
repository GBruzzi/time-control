import client from "../database/db";
import { UserRequestBody } from "../controllers/userController";
import { Response, response } from "express";
// import bcrypt from 'bcrypt';

export class userRepository {
  async create({
    name,
    numero_matricula,
    email,
    senha,
    confirmSenha,
  }: UserRequestBody, res: Response) {
    if (senha != confirmSenha) {
      return res.status(400).json({ error: 'As senhas precisam ser iguais' });

    }
    // const senhaHash = await bcrypt.hash(senha, 10)
    const is_admDefault = false;
    const result = await client.query(
      `
      INSERT INTO usuario(name,numero_matricula,email,senha,is_adm)
      VALUES($1,$2,$3,$4,$5)
      RETURNING *
    `,
      [name, numero_matricula, email, senha, is_admDefault]
    );

    // Acesse os resultados usando a propriedade 'rows'
    const rows = result.rows;

    if (rows.length > 0) {
      return rows;
    } else {
      return null; // ou qualquer outro valor apropriado
    }
  }

  async findByEmail(email: string) {
    const result = await client.query(
      "SELECT * FROM usuario WHERE email = $1",
      [email]
    );

    // Acesse os resultados usando a propriedade 'rows'
    const rows = result.rows;

    if (rows.length > 0) {
      return rows[0]; // Retorna a primeira linha encontrada
    } else {
      return null; // Retorna null se nenhum resultado for encontrado
    }
  }
}
