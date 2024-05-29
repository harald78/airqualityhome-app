import {fakeAsync, TestBed} from "@angular/core/testing";
import {AuthState} from "./auth.state";
import {userMock} from "../../../../../mock/user-mock";
import {expect} from "@playwright/test";

describe("AuthState Test", () => {

  it('should have ANONYMOUS_USER in state', fakeAsync(() => {
    const authState = TestBed.inject(AuthState);
    expect(authState.user).toBeTruthy();
    expect(authState.user().id).toBeFalsy();
    expect(authState.isLoggedIn()).toBeFalsy();
  }));

  it('should have loading false', fakeAsync(() => {
    const authState = TestBed.inject(AuthState);
    expect(authState.loadingProfile()).toBeFalsy();
    expect(authState.isLoading()).toBeFalsy();
  }));

  it('should set user to state', fakeAsync(async () => {
    const authState = TestBed.inject(AuthState);
    await authState.setUser(userMock)
    expect(authState.user()).toBeTruthy();
    expect(authState.user().id).toBeTruthy();
    expect(authState.isLoggedIn()).toBeTruthy();
  }));

  it('should set loading to state', fakeAsync(async () => {
    const authState = TestBed.inject(AuthState);
    authState.loading(true);
    expect(authState.loadingProfile()).toBeTruthy();
    expect(authState.isLoading()).toBeTruthy();
  }));

  it('should logout user', fakeAsync(async () => {
    const authState = TestBed.inject(AuthState);
    await authState.setUser(userMock);
    expect(authState.user().id).toBeTruthy();

    await authState.logout();
    expect(authState.user().id).toBeFalsy();
  }));

});
