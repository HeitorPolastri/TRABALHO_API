
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    age: number;
    senha: string; 
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    published: boolean;
}

export const users: User[] = [
  { id: 1, name: "Flávio", email: "flavio@flavio.com", senha: "flavio123", role: "admin", age: 28 },
  { id: 2, name: "Maria", email: "maria@maria.com", senha: "maria123", role: "user", age: 34 },
  { id: 3, name: "João", email: "joao@joao.com", senha: "joao123", role: "user", age: 22 },
  { id: 4, name: "Ana", email: "ana@ana.com", senha: "ana123", role: "user", age: 19 },
  { id: 5, name: "Carlos", email: "carlos@carlos.com", senha: "carlos123", role: "user", age: 41 },
  { id: 6, name: "Fernanda", email: "fernanda@fernanda.com", senha: "fernanda123", role: "admin", age: 30 },
  { id: 7, name: "Pedro", email: "pedro@pedro.com", senha: "pedro123", role: "user", age: 27 },
  { id: 8, name: "Juliana", email: "juliana@juliana.com", senha: "juliana123", role: "user", age: 25 },
  { id: 9, name: "Lucas", email: "lucas@lucas.com", senha: "lucas123", role: "user", age: 33 },
  { id: 10, name: "Camila", email: "camila@camila.com", senha: "camila123", role: "user", age: 29 },
  { id: 11, name: "André", email: "andre@andre.com", senha: "andre123", role: "user", age: 26 },
  { id: 12, name: "Paula", email: "paula@paula.com", senha: "paula123", role: "user", age: 32 }
];

export let posts: Post[] = [
    { id: 1, title: "Primeiro Post", content: "Conteúdo do Primeiro post...", authorId: 2, createdAt: new Date("2023-01-01"), published: true },
    { id: 2, title: "Artigo do Admin", content: "Admin Artigo", authorId: 1, createdAt: new Date("2023-02-15"), published: true },
    { id: 3, title: "Rascunho", content: "aaaaaa rascunho Heitor.", authorId: 3, createdAt: new Date("2023-03-20"), published: false },
];
