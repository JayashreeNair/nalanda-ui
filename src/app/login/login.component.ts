import {Component, OnInit} from '@angular/core';
import {createFeatureSelector, createSelector, select, Store} from '@ngrx/store';
import {triggerLogin} from './login-actions';
import {AuthenticationState, loginFeatureKey} from './login.reducer';
import {Router} from '@angular/router';
import {AppState} from '../app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  login() {
    this.store.dispatch(triggerLogin({username: this.email, password: this.password}));
    this.store.pipe(
      select(selectAuthenticatedState)
    ).subscribe(val => {
      if (val) {
        this.router.navigateByUrl('/landing');
      } else {
        this.router.navigateByUrl('/sign-in');
      }
    });
  }
}


export const authenticatedStateSelector = createFeatureSelector<AppState, AuthenticationState>(loginFeatureKey);

export const selectAuthenticatedState =
  createSelector(authenticatedStateSelector, (authenticationState: AuthenticationState) => authenticationState.authenticated);

