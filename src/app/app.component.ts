import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  template: `
    <h1>Session Tracker</h1>
    <p>Log a new session</p>
    <form #f="ngForm" (ngSubmit)="save(f)">
      Start: <input type="text" name="startTime" ngModel>
      End: <input type="text" name="endTime" ngModel>
      <button type="submit">Save</button>
    </form>
    <p>Past sessions</p>
    <ul>
      <li *ngFor="let session of sessions; let i=index">
        {{ session.startTime }} to {{ session.endTime }}
        <button (click)="delete(i)">Delete</button>
      </li>
    </ul>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  sessions: Session[];
  constructor(private localStorage: LocalStorage) {}

  ngOnInit(): void {
    this.localStorage.getItem<Session[]>('sessions')
      .subscribe((sessions) => {
        this.sessions = (sessions === null) ? [] : sessions;
      });
  }

  save(form: FormGroup): void {
    console.log(form.value);
    this.sessions.push(form.value);
    this.localStorage.setItem('sessions', this.sessions)
      .subscribe(() => {
        form.reset();
      });
  }

  delete(index: number): void {
    this.sessions.splice(index, 1);
    this.localStorage.setItem('sessions', this.sessions)
      .subscribe();
  }
}

interface Session {
  startTime: string;
  endTime: string;
}
