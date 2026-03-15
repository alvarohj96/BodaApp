import { TestBed } from '@angular/core/testing';

import { Wedding } from './wedding';

describe('Wedding', () => {
  let service: Wedding;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wedding);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
