import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }
  overlay: WritableSignal<boolean> = signal(false);

  show(): void {
    this.overlay.set(true);
  }

  hide(): void {
    this.overlay.set(false);
  }
}
