import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {User} from "../../../shared/model/user.model";
import {computed} from "@angular/core";


export const ANONYMOUS_USER: User = {
  id: undefined,
  email: '',
  username: '',
  roles: []
}

export const AuthState = signalStore(
  {providedIn: 'root'},
  withState({
    user: ANONYMOUS_USER,
    loadingProfile: false
  }),
  withMethods((store) => {
    return {
      // Only called on onInit or after successful login
      async setUser(user: User) {
        patchState(store, {user: user, loadingProfile: false});
      },
      async logout() {
        patchState(store, {user: ANONYMOUS_USER, loadingProfile: false});
      },
      loading(loading: boolean) {
        patchState(store, {loadingProfile: loading});
      }
    }
  }),
  withComputed(({ user, loadingProfile }) => ({
      isLoggedIn: computed(() => !!user().id),
      isLoading: computed(() => loadingProfile())
  }))
);

export type AuthState = InstanceType<typeof AuthState>;
