export type UserStatus = "active" | "locked";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  failedAttempts: number;
  status: UserStatus;
};

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Praise Innocent",
    email: "praise@example.com",
    role: "admin",
    failedAttempts: 0,
    status: "active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "viewer",
    failedAttempts: 5,
    status: "locked",
  },
  {
    id: 3,
    name: "Amaka Grace",
    email: "amaka@example.com",
    role: "editor",
    failedAttempts: 3,
    status: "active",
  },
];