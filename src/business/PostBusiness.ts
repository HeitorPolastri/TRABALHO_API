import { PostData } from "../data/PostData";
import { UserData } from "../data/UserData";
import { Post } from "../bd";

export class PostBusiness {
  private postData = new PostData();
  private userData = new UserData();

 
  getPostById = (postId: number, userId: number | undefined): Post => {
    const post = this.postData.getPostById(postId);

    if (!post) {
    throw new Error("Post não encontrado");
    }

    
    if (!post.published) {
      
      const user = userId ? this.userData.getUserById(userId) : undefined;

      if (user?.role !== "admin" && post.authorId !== userId) {
      throw new Error("Não autorizado. Este post não está publicado.");
      }
    }

    return post;
  };

  //  EXERCÍCIO 3 
  createPost = (title: string, content: string, authorId: number): Post => {
    if (!title || title.length < 3) {
    throw new Error("Título: Mínimo 3 caracteres");
    }
    if (!content || content.length < 10) {
    throw new Error("Conteúdo: Mínimo 10 caracteres");
    }

    const author = this.userData.getUserById(authorId);
    if (!author) {
    throw new Error("Autor não encontrado");
    }

  return this.postData.createPost(title, content, authorId);
  };

  // EXERCÍCIO 5 
  updatePostFields = (postId: number, title: string | undefined, content: string | undefined, published: boolean | undefined): Post => {
    const post = this.postData.getPostById(postId);

    if (!post) {
    throw new Error("Post não encontrado");
    }

    
    if (title !== undefined) {
    if (title.length < 3) throw new Error("Título inválido: mínimo 3 caracteres");
    post.title = title;
    }
    if (content !== undefined) {
    if (content.length < 10) throw new Error("Conteúdo inválido: mínimo 10 caracteres");
    post.content = content;
    }
    if (published !== undefined) {
    post.published = published;
    }

    return post;
  };

  // EXERCÍCIO 6 
  deletePost = (postId: number, userId: number): { success: boolean; message: string } => {
    const post = this.postData.getPostById(postId);

    if (!post) {
    throw new Error("Post não encontrado");
    }

    const user = this.userData.getUserById(userId);

    if (!user) {
    throw new Error("Não autorizado. ID de usuário inválido.");
    }

    
    if (user.role !== "admin" && post.authorId !== user.id) {
    throw new Error("Não autorizado. Apenas o autor ou um administrador pode excluir este post.");
    }

    if (this.postData.deletePost(postId)) {
    return { success: true, message: "Post removido com sucesso" };
    } else {
    throw new Error("Erro ao remover post.");
    }
  };
}
