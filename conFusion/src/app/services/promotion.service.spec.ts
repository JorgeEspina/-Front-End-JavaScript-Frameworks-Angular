import { TestBed } from '@angular/core/testing';

import { PromotionserviceService } from './promotionservice.service';

describe('PromotionserviceService', () => {
  let service: PromotionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromotionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
