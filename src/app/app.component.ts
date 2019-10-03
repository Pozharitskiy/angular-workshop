import { Component } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSpinner$: Observable<boolean>;

  constructor(private spinner: SpinnerService) {
    this.showSpinner$ = spinner.getValue();
  }
}
