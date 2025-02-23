export interface IUser {
  name: string;
  age?:number;
  email: string;
  password:string;
  photo?: string;
  role?: "admin" | "user";
  status?: "active" | "inactive";
}
