import {TestBed, waitForAsync} from "@angular/core/testing";
import {Toast, ToastService} from "./toast.service";

describe('ToastService Test', () => {
  let service: ToastService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });

    service = TestBed.inject(ToastService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show Toast', () => {
    const toast: Toast = {
      body: "TEST", header: "", icon: "", iconColor: ""
    }

    service.show(toast);

    expect(service.toasts.length).toBe(1);
  });

  it('should remove Toast', () => {
    const toast: Toast = {
      body: "TEST", header: "", icon: "", iconColor: ""
    }
    service.toasts.push(toast);

    service.remove(toast);

    expect(service.toasts.length).toBe(0);
  });

  it('should clear all Toast', () => {
    const toast: Toast = {
      body: "TEST", header: "", icon: "", iconColor: ""
    }
    service.toasts.push(toast);

    service.clear();

    expect(service.toasts.length).toBe(0);
  });

});
