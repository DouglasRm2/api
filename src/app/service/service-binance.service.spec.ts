import { TestBed } from '@angular/core/testing';

import { ServiceBinanceService } from './service-binance.service';

describe('ServiceBinanceService', () => {
  let service: ServiceBinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
