import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task, TaskPayload, TaskStatus } from '../models/task.model';
const API = 'http://localhost:5000/api/tasks';
@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}
  list(status?: TaskStatus) {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Task[]>(API, { params });
  }
  get(id: string) {
    return this.http.get<Task>(`${API}/${id}`);
  }
  create(data: TaskPayload) {
    return this.http.post<Task>(API, data);
  }
  update(id: string, data: Partial<TaskPayload>) {
    return this.http.patch<Task>(`${API}/${id}`, data);
  }
  delete(id: string) {
    return this.http.delete(`${API}/${id}`);
  }
}
