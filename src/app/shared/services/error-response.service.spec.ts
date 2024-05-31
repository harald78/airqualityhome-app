import {TestBed, waitForAsync} from "@angular/core/testing";
import {ErrorResponseService} from "./error-response.service";

describe('Error ResponseService Test', () => {
  let service: ErrorResponseService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: []
    });
    service = TestBed.inject(ErrorResponseService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return BAD REQUEST', () => {
    const result = service.getHttpErrorResponseTextByStatus(400);
    expect(result).toEqual("BAD REQUEST");
  });

  it('should return NOT AUTHORIZED', () => {
    const result = service.getHttpErrorResponseTextByStatus(401);
    expect(result).toEqual("NOT AUTHORIZED");
  });

  it('should return FORBIDDEN', () => {
    const result = service.getHttpErrorResponseTextByStatus(403);
    expect(result).toEqual("FORBIDDEN");
  });

  it('should return NOT FOUND', () => {
    const result = service.getHttpErrorResponseTextByStatus(404);
    expect(result).toEqual("NOT FOUND");
  });

  it('should return INTERNAL SERVER ERROR', () => {
    const result = service.getHttpErrorResponseTextByStatus(500);
    expect(result).toEqual("INTERNAL SERVER ERROR");
  });

  it('should return UPS SOMETHING WENT WRONG :(', () => {
    const result = service.getHttpErrorResponseTextByStatus(504);
    expect(result).toEqual("UPS SOMETHING WENT WRONG :(");
  });

})
