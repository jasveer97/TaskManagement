export type Role = 'Manager' | 'Team Lead' | 'Employee';
export interface User {
  _id: string;
  username: string;
  email: string;
  role: Role;
  manager?: string | null;
  teamLead?: string | null;
}
