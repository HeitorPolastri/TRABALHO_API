import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  private postBusiness = new PostBusiness();

  private sendErrorResponse = (res: Response, error: any): void => {
  let statusCode = 500;
  const message = error.message || "Erro interno do servidor";

  
    if (message.includes("não encontrado") || message.includes("inexistente")) {
    statusCode = 404;
    } else if (
    message.includes("Autor não encontrado") ||
    message.includes("Mínimo") ||
    message.includes("inválido") ||
    message.includes("Campos faltantes")
    ) {
    statusCode = 400; 
    } else if (message.includes("Não autorizado") || message.includes("excluir") || message.includes("publicado")) {
    statusCode = 403; 
    }

    res.status(statusCode).json({ success: statusCode !== 500, message: message });
  };

  
  public getPostById = (req: Request, res: Response): void => {
    try {
    const postId = parseInt(req.params.id);
      
    const userId = parseInt(req.header("User-Id") || "0") || undefined;

    const post = this.postBusiness.getPostById(postId, userId);

    res.status(200).json(post);
    } catch (error: any) {
    this.sendErrorResponse(res, error);
    }
  };

  
  public createPost = (req: Request, res: Response): void => {
    try {
    const { title, content, authorId } = req.body;
    const newPost = this.postBusiness.createPost(title, content, authorId);

    res.status(201).json(newPost); 
    } catch (error: any) {
    this.sendErrorResponse(res, error);
    }
  };

  // EXERCÍCIO 5
  public updatePostPartial = (req: Request, res: Response): void => {
    try {
    const postId = parseInt(req.params.id);
    const { title, content, published } = req.body;

    const updatedPost = this.postBusiness.updatePostFields(postId, title, content, published);

    res.status(200).json(updatedPost);
    } catch (error: any) {
    this.sendErrorResponse(res, error);
    }
  };

  // EXERCÍCIO 6
  public deletePost = (req: Request, res: Response): void => {
    try {
    const postId = parseInt(req.params.id);
     
    const userId = parseInt(req.header("User-Id") || "0");

    const result = this.postBusiness.deletePost(postId, userId);

    res.status(200).json(result);
    } catch (error: any) {
    this.sendErrorResponse(res, error);
    }
  };
}
