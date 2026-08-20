import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../core/services/auth.service';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  styles: [
    '.auth{min-height:100vh;display:grid;place-items:center;padding:20px}.box{width:min(100%,420px)}h1{margin:0 0 6px}.field{width:100%}.error{color:#b91c1c;font-size:14px}',
  ],
  template: `<main class="auth">
    <mat-card class="box"
      ><mat-card-content
        ><h1>Create account</h1>
        <p class="muted">Start managing your work.</p>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field class="field"
            ><mat-label>Username</mat-label
            ><input matInput formControlName="username" /></mat-form-field
          ><mat-form-field class="field"
            ><mat-label>Email</mat-label
            ><input matInput type="email" formControlName="email" /></mat-form-field
          ><mat-form-field class="field"
            ><mat-label>Password</mat-label
            ><input matInput type="password" formControlName="password" /></mat-form-field
          ><mat-form-field class="field"
            ><mat-label>Role</mat-label
            ><mat-select formControlName="role"
              ><mat-option value="Employee">Employee</mat-option
              ><mat-option value="Team Lead">Team Lead</mat-option
              ><mat-option value="Manager">Manager</mat-option></mat-select
            ></mat-form-field
          >
          <p class="error" *ngIf="error">{{ error }}</p>
          <button mat-flat-button color="primary" class="field" [disabled]="form.invalid">
            Register
          </button>
        </form>
        <p class="muted">
          Already have an account? <a routerLink="/login">Sign in</a>
        </p></mat-card-content
      ></mat-card
    >
  </main>`,
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['Employee'],
  });
  error = '';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}
  submit() {
    if (this.form.invalid) return;
    this.auth
      .register(this.form.getRawValue())
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (e) => (this.error = e.error?.message || 'Unable to register'),
      });
  }
}
