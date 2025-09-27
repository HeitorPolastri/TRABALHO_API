import { users, User, Post } from "../bd";

export class UserData {
  //  Busca todos os usuários
  getAllUsers = (): User[] => {
    return users;
  };

  
  getUserById = (userId: number): User | undefined => {
    return users.find((u) => u.id === userId);
  };

  
  getUserByEmail = (email: string): User[] => {
    return users.filter((user) => user.email === email);
  };

  
  getUsersByAgeRange = (min: number, max: number): User[] => {
    return users.filter((u) => u.age >= min && u.age <= max);
  };

  updateUser = (userId: number, newData: Omit<User, "id" | "senha">): User | undefined => {
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) {
      return undefined;
    }

    

    users[index] = { ...users[index], ...newData };
    return users[index];
  };

  
  deleteUser = (userId: number): void => {
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
    }
    
  };

  
  getInactiveUsers = (allPosts: Post[]): User[] => {
    return users.filter((u) => u.role !== "admin" && !allPosts.some((p) => p.authorId === u.id));
  };
}
