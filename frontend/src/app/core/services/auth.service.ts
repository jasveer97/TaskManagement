import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../models/user.model';
const API = 'http://localhost:5000/api';
interface AuthResult {
  user: User;
  token: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = signal<User | null>(this.readUser());
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  private readUser() {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
  login(data: { email: string; password: string }) {
    return this.http.post<AuthResult>(`${API}/auth/login`, data).pipe(tap((r) => this.save(r)));
  }
  register(data: unknown) {
    return this.http.post<AuthResult>(`${API}/auth/register`, data).pipe(tap((r) => this.save(r)));
  }
  private save(r: AuthResult) {
    localStorage.setItem('token', r.token);
    localStorage.setItem('user', JSON.stringify(r.user));
    this.user.set(r.user);
  }
  logout() {
    localStorage.clear();
    this.user.set(null);
    this.router.navigateByUrl('/login');
  }
  token() {
    return localStorage.getItem('token');
  }
}
