import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service';
import { UserService } from '../../core/services/user.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  template: `<main class="page">
    <h1>{{ editing ? 'Edit task' : 'Create task' }}</h1>
    <p class="muted">
      {{ editing ? 'Update task details and assignment.' : 'Add a task to your work queue.' }}
    </p>
    <form class="card form-grid" [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field class="full"
        ><mat-label>Title</mat-label><input matInput formControlName="title" /></mat-form-field
      ><mat-form-field class="full"
        ><mat-label>Description</mat-label
        ><textarea matInput rows="5" formControlName="description"></textarea></mat-form-field
      ><mat-form-field
        ><mat-label>Status</mat-label
        ><mat-select formControlName="status"
          ><mat-option value="pending">Pending</mat-option
          ><mat-option value="completed">Completed</mat-option></mat-select
        ></mat-form-field
      ><mat-form-field *ngIf="canAssign"
        ><mat-label>Assign to</mat-label
        ><mat-select formControlName="assignedTo"
          ><mat-option [value]="selfId">Myself</mat-option
          ><mat-option *ngFor="let user of users" [value]="user._id"
            >{{ user.username }} — {{ user.role }}</mat-option
          ></mat-select
        ></mat-form-field
      >
      <p class="error full" *ngIf="error">{{ error }}</p>
      <div class="actions full">
        <button mat-button type="button" (click)="router.navigateByUrl('/tasks')">Cancel</button
        ><button mat-flat-button color="primary" [disabled]="form.invalid">
          {{ editing ? 'Save changes' : 'Create task' }}
        </button>
      </div>
    </form>
  </main>`,
  styles: ['.error{color:#b91c1c;margin:0}.form-grid{max-width:700px}'],
})
export class TaskFormComponent implements OnInit {
  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['pending'],
    assignedTo: [''],
  });
  users: User[] = [];
  editing = false;
  id = '';
  error = '';
  selfId = this.auth.user()?._id || '';
  get canAssign() {
    return this.auth.user()?.role !== 'Employee';
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private tasks: TaskService,
    private usersService: UserService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.editing = !!this.id;
    if (!this.canAssign) this.form.controls.assignedTo.disable();
    else this.loadUsers();
    if (this.editing)
      this.tasks
        .get(this.id)
        .subscribe({
          next: (t) =>
            this.form.patchValue({
              title: t.title,
              description: t.description,
              status: t.status,
              assignedTo: t.assignedTo._id,
            }),
          error: (e) => (this.error = e.error?.message || 'Unable to load task'),
        });
  }
  loadUsers() {
    const request =
      this.auth.user()?.role === 'Manager' ? this.usersService.all() : this.usersService.team();
    request.subscribe((users) => (this.users = users.filter((user) => user._id !== this.selfId)));
  }
  submit() {
    if (this.form.invalid) return;
    const data: any = { ...this.form.getRawValue() };
    if (!this.canAssign || !data.assignedTo) delete data.assignedTo;
    const request = this.editing ? this.tasks.update(this.id, data) : this.tasks.create(data);
    request.subscribe({
      next: () => this.router.navigateByUrl('/tasks'),
      error: (e) => (this.error = e.error?.message || 'Unable to save task'),
    });
  }
}
