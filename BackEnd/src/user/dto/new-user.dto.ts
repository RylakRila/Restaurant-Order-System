export interface NewUser {
    username: string;
    password: string;
    role: "admin" | "user";
}
