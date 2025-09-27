import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  private userBusiness = new UserBusiness();

  // GET /users
  getAllUsers = (req: Request, res: Response): void => {
    try {
      const users = this.userBusiness.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).send({ message: error.message || "Erro interno do servidor" });
    }
  };

  // EXERCÍCIO 1 - GET /users/:id
  getUserById = (req: Request, res: Response): void => {
    try {
      const userId = parseInt(req.params.id);
      const user = this.userBusiness.getUserById(userId);
      res.json(user);
    } catch (error: any) {
      if (error.message.includes("não encontrado")) {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message || "Erro interno do servidor" });
      }
    }
  };

  // EXERCÍCIO 2 - GET /users/age-range/
  getUsersByAgeRange = (req: Request, res: Response): void => {
    try {
      const { min, max }: any = req.query;
      const result = this.userBusiness.getUsersByAgeRange(min, max);
      res.json(result);
    } catch (error: any) {
      if (error.message.includes("Inválido")) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message || "Erro interno do servidor" });
      }
    }
  };

  // EXERCÍCIO 4 - PUT /users/:id
  updateUser = (req: Request, res: Response): void => {
    try {
      const userId = parseInt(req.params.id);
      const { name, email, role, age } = req.body;

      const updatedUser = this.userBusiness.updateUser(userId, name, email, role, age);
      res.json(updatedUser);
    } catch (error: any) {
      let statusCode = 500;
      if (error.message.includes("obrigatórios") || error.message.includes("Email já está em uso")) {
        statusCode = 400;
      } else if (error.message.includes("não encontrado")) {
        statusCode = 404;
      }
      res.status(statusCode).json({ message: error.message || "Erro ao atualizar usuário" });
    }
  };

  // DELETE /users/:id
  deleteUser = (req: Request, res: Response): void => {
    try {
      const userId = parseInt(req.params.id);
      this.userBusiness.deleteUser(userId);
      res.status(200).json({ message: "Usuário removido com sucesso." });
    } catch (error: any) {
      let statusCode = 500;
      if (error.message.includes("não encontrado")) {
        statusCode = 404;
      }
      res.status(statusCode).json({ message: error.message || "Erro ao deletar usuário" });
    }
  };

  // EXERCÍCIO 7 - DELETE /users/cleanup-inactive
  cleanupInactiveUsers = (req: Request, res: Response): void => {
    try {
      const { confirm }: any = req.query;
      const result = this.userBusiness.cleanupInactiveUsers(confirm);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao limpar usuários inativos" });
    }
  };
}
