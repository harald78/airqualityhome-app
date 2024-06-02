import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthState} from "../auth/+state/auth.state";

export const isAuthenticated: CanActivateFn = () => {
      const authState = inject(AuthState);
      return authState.isLoggedIn();
  };
