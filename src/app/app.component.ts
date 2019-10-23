import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpinnerService } from './core/services/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  showSpinner$: Observable<boolean>;
  get runChangeDetection() {
    return true;
  }
  constructor(private spinner: SpinnerService) {
    this.showSpinner$ = this.spinner.getValue();
  }
}
