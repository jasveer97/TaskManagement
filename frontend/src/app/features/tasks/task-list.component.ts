import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { Task, TaskStatus } from '../../core/models/task.model';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
  ],
  template: `<main class="page">
    <div class="head">
      <div>
        <h1>Tasks</h1>
        <p class="muted">View and manage tasks available to you.</p>
      </div>
      <a mat-flat-button color="primary" routerLink="/tasks/new">Create task</a>
    </div>
    <div class="card filters">
      <mat-form-field
        ><mat-label>Status</mat-label
        ><mat-select [(ngModel)]="status" (selectionChange)="load()"
          ><mat-option [value]="undefined">All statuses</mat-option
          ><mat-option value="pending">Pending</mat-option
          ><mat-option value="completed">Completed</mat-option></mat-select
        ></mat-form-field
      >
    </div>
    <div class="card" style="margin-top:16px;overflow:auto">
      <table mat-table [dataSource]="tasks" class="table">
        <ng-container matColumnDef="title"
          ><th mat-header-cell *matHeaderCellDef>Task</th>
          <td mat-cell *matCellDef="let t">
            <strong>{{ t.title }}</strong
            ><br /><small class="muted">{{ t.description }}</small>
          </td></ng-container
        ><ng-container matColumnDef="assigned"
          ><th mat-header-cell *matHeaderCellDef>Assigned to</th>
          <td mat-cell *matCellDef="let t">{{ t.assignedTo.username }}</td></ng-container
        ><ng-container matColumnDef="status"
          ><th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let t">
            <mat-chip>{{ t.status }}</mat-chip>
          </td></ng-container
        ><ng-container matColumnDef="actions"
          ><th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let t">
            <a mat-button [routerLink]="['/tasks', t._id, 'edit']">Edit</a
            ><button mat-button color="warn" *ngIf="isManager" (click)="remove(t)">Delete</button>
          </td></ng-container
        >
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>
      <p class="empty" *ngIf="!tasks.length">No tasks found.</p>
    </div>
  </main>`,
  styles: [
    '.head{display:flex;justify-content:space-between;align-items:center}.filters{padding:4px 18px}.filters mat-form-field{width:200px}.table{min-width:680px;width:100%}',
  ],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  status: TaskStatus | undefined;
  columns = ['title', 'assigned', 'status', 'actions'];
  get isManager() {
    return this.auth.user()?.role === 'Manager';
  }
  constructor(
    private service: TaskService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service.list(this.status).subscribe((x) => (this.tasks = x));
  }
  remove(t: Task) {
    if (confirm(`Delete ${t.title}?`)) this.service.delete(t._id).subscribe(() => this.load());
  }
}
