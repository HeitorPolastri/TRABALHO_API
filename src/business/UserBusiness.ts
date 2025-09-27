import { UserData } from "../data/UserData";
import { User } from "../bd";
import { PostData } from "../data/PostData";

export class UserBusiness {
  private userData = new UserData();
  private postData = new PostData();

  getAllUsers = (): User[] => {
    return this.userData.getAllUsers();
  };

  getUserById = (id: number): User => {
    const user = this.userData.getUserById(id);
    if (!user) {
    throw new Error("Usuário não encontrado");
    }
    return user;
  };

  getUsersByAgeRange = (minStr: string | string[] | undefined, maxStr: string | string[] | undefined): User[] => {
    const min = parseInt(String(minStr));
    const max = parseInt(String(maxStr));

    if (isNaN(min) || isNaN(max)) {
    throw new Error("Inválido. Use números.");
    }
    if (min < 0 || max < min) {
    throw new Error("Inválido. Mínimo e máximo devem ser válidos.");
    }
    return this.userData.getUsersByAgeRange(min, max);
  };

  updateUser = (userId: number, name: string, email: string, role: string, age: number): User => {
    if (!name || !email || !role || !age) {
      throw new Error("São obrigatórios: name, email, role, age.");
    }

    const existingUser = this.userData.getUserById(userId);
    if (!existingUser) {
    throw new Error("Usuário não encontrado");
    }

    const newData = { name, email, role: role as "admin" | "user", age };

    if (this.userData.getUserByEmail(email).some((u) => u.id !== userId)) {
    throw new Error("Email já está em uso.");
    }

    const updatedUser: any = this.userData.updateUser(userId, newData);
    return updatedUser;
  };

  deleteUser = (userId: number): void => {
    const user = this.userData.getUserById(userId);
    if (!user) {
    throw new Error("Usuário não encontrado.");
    }

    this.userData.deleteUser(userId);
  };

  cleanupInactiveUsers = (confirm: string | string[] | undefined): { message: string; removed?: User[] } => {
    if (confirm !== "true") {
    throw new Error("Confirmação necessária ?confirm=true para exclusão.");
    }

    const inactiveUsers = this.userData.getInactiveUsers(this.postData.getAllPosts());

    if (inactiveUsers.length === 0) {
    return { message: "Nenhum inativo" };
    }

    inactiveUsers.forEach((u) => this.userData.deleteUser(u.id));

    return {
    message: "Usuários removidos",
    removed: inactiveUsers,
    };
  };
}
