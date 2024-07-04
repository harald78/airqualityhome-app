import {DestroyRef, inject, Injectable} from '@angular/core';
import {Router, RoutesRecognized} from "@angular/router";
import {
  BehaviorSubject,
  filter,
  fromEvent,
  map,
  merge,
  of,
  pairwise,
  Subscription,
} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {

  private readonly router: Router = inject(Router);
  private previousUrl: string;

  networkStatusSubscription$: Subscription = Subscription.EMPTY;
  networkStatus$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private destroyRef: DestroyRef) {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });

    this.destroyRef.onDestroy(() => {
      if (this.networkStatusSubscription$) {
        this.networkStatusSubscription$.unsubscribe();
      }
    })
  }

  checkNetworkStatus() {
    this.networkStatusSubscription$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(
        map(() => navigator.onLine))
        .subscribe(async (status) => {
          this.networkStatus$.next(status);
        if (status && this.previousUrl) {
          await this.router.navigateByUrl(this.previousUrl);
        } else if (status) {
          await this.router.navigate(['dashboard']);
        } else {
          await this.router.navigate(['offline']);
        }
      });
  }
}
