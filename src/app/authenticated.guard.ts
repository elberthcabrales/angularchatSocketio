import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from "@angular/router";
import { Router } from '@angular/router';
// import rxjs
import { Observable } from "rxjs/Observable";

// import @ngrx
import { Store } from "@ngrx/store";
import * as fromRoot from './app.reducer';


/**
 * Prevent unauthorized activating and loading of routes
 * @class AuthenticatedGuard
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate, CanLoad {

  /**
   * @constructor
   */
  constructor( private store: Store<fromRoot.State>, private router: Router) {}

  /**
   * True when user is authenticated
   * @method canActivate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // get observable
    const observable = this.store.select(fromRoot.getIsAuth);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        //envia a la ruta
        this.router.navigate(['/login']);
      }
    });

    return observable;
  }

  /**
   * True when user is authenticated
   * @method canLoad
   */
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // get observable
    const observable = this.store.select(fromRoot.getIsAuth);

    // redirect to sign in page if user is not authenticated
    observable.subscribe(authenticated => {
      if (!authenticated) {
        this.router.navigate(['/login']);
      }
    });

    return observable;
  }
}
