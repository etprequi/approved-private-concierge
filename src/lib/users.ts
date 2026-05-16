const uuidv4 = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);

export type Role = 'staff' | 'customer';

export interface AppUser {
  id: string;
  username?: string;
  email?: string;
  password: string;
  role: Role;
  name?: string;
}

const STORAGE_KEY = 'approved-users';

function readStore(): AppUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaultAdmin: AppUser = { id: uuidv4(), username: 'admin', email: 'admin@approved.com', password: 'admin', role: 'staff', name: 'Super Admin' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultAdmin]));
      return [defaultAdmin];
    }
    return JSON.parse(raw) as AppUser[];
  } catch {
    return [];
  }
}

export function getUsers(): AppUser[] {
  return readStore();
}

export function saveUsers(users: AppUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function findUserByEmail(email: string) {
  return readStore().find(u => u.email?.toLowerCase() === email.toLowerCase());
}

export function findUserByUsername(username: string) {
  return readStore().find(u => (u.username || '').toLowerCase() === username.toLowerCase());
}

export function createUser(data: { username?: string; email?: string; password: string; role: Role; name?: string }) {
  const users = readStore();
  const u = { id: uuidv4(), username: data.username, email: data.email, password: data.password, role: data.role, name: data.name } as AppUser;
  users.push(u);
  saveUsers(users);
  return u;
}

export function updatePasswordForEmail(email: string, newPassword: string) {
  const users = readStore();
  const idx = users.findIndex(u => u.email?.toLowerCase() === email.toLowerCase());
  if (idx === -1) return false;
  users[idx].password = newPassword;
  saveUsers(users);
  return true;
}

export function validateCredentials(identifier: string, password: string, role: Role) {
  const users = readStore();
  const found = users.find(u => (u.role === role) && ((u.email && u.email.toLowerCase() === identifier.toLowerCase()) || (u.username && u.username.toLowerCase() === identifier.toLowerCase())));
  if (!found) return false;
  return found.password === password;
}

export default {
  getUsers,
  createUser,
  findUserByEmail,
  findUserByUsername,
  updatePasswordForEmail,
  validateCredentials,
};
