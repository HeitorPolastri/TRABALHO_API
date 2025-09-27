import { posts, Post } from "../bd";

export class PostData {
  // Retorna todos os posts (necessário para UserBusiness validar inativos)
  getAllPosts = (): Post[] => {
    return posts;
  };

  // Cria um novo post (EXERCÍCIO 3 - parte data)
  createPost = (title: string, content: string, authorId: number): Post => {
    const newPost: Post = {
      id: posts.length + 1,
      title,
      content,
      authorId,
      createdAt: new Date(),
      published: false,
    };
    posts.push(newPost);
    return newPost;
  };

  // Busca um post por ID para modificação ou visualização
  getPostById = (postId: number): Post | undefined => {
    return posts.find((p) => p.id === postId);
  };

  // Deleta um post
  deletePost = (postId: number): boolean => {
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
      return false;
    }
    posts.splice(postIndex, 1);
    return true;
  };
}
