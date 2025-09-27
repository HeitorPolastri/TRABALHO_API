import { posts, Post } from "../bd";

export class PostData {
  
  getAllPosts = (): Post[] => {
    return posts;
  };

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

  getPostById = (postId: number): Post | undefined => {
    return posts.find((p) => p.id === postId);
  };

  deletePost = (postId: number): boolean => {
    const postIndex = posts.findIndex((p) => p.id === postId);
    if (postIndex === -1) {
      return false;
    }
    posts.splice(postIndex, 1);
    return true;
  };
}
