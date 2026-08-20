import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../core/services/task.service';
@Component({
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule],
  template: `<main class="page">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h1>Dashboard</h1>
        <p class="muted">A quick view of your accessible tasks.</p>
      </div>
      <a mat-flat-button color="primary" routerLink="/tasks/new">Create task</a>
    </div>
    <section class="stats">
      <mat-card
        ><mat-card-content
          ><span class="muted">Total tasks</span><strong>{{ total }}</strong></mat-card-content
        ></mat-card
      ><mat-card
        ><mat-card-content
          ><span class="muted">Pending</span><strong>{{ pending }}</strong></mat-card-content
        ></mat-card
      ><mat-card
        ><mat-card-content
          ><span class="muted">Completed</span><strong>{{ completed }}</strong></mat-card-content
        ></mat-card
      >
    </section>
  </main>`,
  styles: [
    '.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:26px}.stats strong{display:block;font-size:30px;margin-top:8px}@media(max-width:600px){.stats{grid-template-columns:1fr}}',
  ],
})
export class DashboardComponent implements OnInit {
  total = 0;
  pending = 0;
  completed = 0;
  constructor(private tasks: TaskService) {}
  ngOnInit() {
    this.tasks.list().subscribe((list) => {
      this.total = list.length;
      this.pending = list.filter((t) => t.status === 'pending').length;
      this.completed = list.filter((t) => t.status === 'completed').length;
    });
  }
}
