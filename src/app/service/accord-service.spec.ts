import { TestBed } from '@angular/core/testing';

import { AccordService } from './accord.service';

describe('AccordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccordService = TestBed.get(AccordService);
    expect(service).toBeTruthy();
  });
});
