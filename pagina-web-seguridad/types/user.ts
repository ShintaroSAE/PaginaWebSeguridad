export interface User {
  _id: string;
  email: string;
  role: "admin" | "user";
  nombre: string;
}