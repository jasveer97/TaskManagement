import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../core/services/auth.service';
@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  styles: [
    '.bar{position:sticky;top:0;z-index:2;background:white;border-bottom:1px solid #e5e7eb;color:#1e293b}.brand{font-weight:700;margin-right:28px}.spacer{flex:1}.nav{font-size:14px}.name{font-size:14px;margin-right:10px}@media(max-width:600px){.name{display:none}.brand{margin-right:4px}.nav{padding:0 8px}}',
  ],
  template: `<mat-toolbar class="bar"
      ><span class="brand">Task Manager</span
      ><a mat-button class="nav" routerLink="/dashboard" routerLinkActive="active">Dashboard</a
      ><a mat-button class="nav" routerLink="/tasks" routerLinkActive="active">Tasks</a
      ><span class="spacer"></span><span class="name">{{ userName() }}</span
      ><button mat-button (click)="auth.logout()">Sign out</button></mat-toolbar
    ><router-outlet />`,
})
export class MainLayoutComponent {
  constructor(public auth: AuthService) {}
  userName = computed(() => this.auth.user()?.username || '');
}
