import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  `,
  styles: []
})
export class AppComponent {
  save(form: FormGroup): void {
    // save to local storage
    console.log(form.value);
    // clear the form
    form.reset();
  }
}
