import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
const API = 'http://localhost:5000/api/users';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  all() {
    return this.http.get<User[]>(API);
  }
  team() {
    return this.http.get<User[]>(`${API}/team`);
  }
}
