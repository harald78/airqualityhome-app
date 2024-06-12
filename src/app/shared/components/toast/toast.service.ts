import { Injectable, signal, WritableSignal } from '@angular/core';

export interface Toast {
  id?: string;
  header: string;
  body: string;
  icon: string;
  iconColor: string;
  classname?: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  public toast: WritableSignal<Toast[]> = signal(this.toasts);

  show(toast: Toast) {
    this.toast.update(toasts => [...toasts, toast]);
  }

  remove(toast: Toast) {
    this.toast.update(() => this.toasts.filter((t) => t !== toast));
  }

  clear() {
    this.toast.set([]);
  }
}
