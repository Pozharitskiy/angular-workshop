import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { isUndefined } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthorized().pipe(
      filter(isAuth => {
        return !isUndefined(isAuth);
      }),
      map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['login']);
        }
        return isAuth;
      })
    );
  }
}
