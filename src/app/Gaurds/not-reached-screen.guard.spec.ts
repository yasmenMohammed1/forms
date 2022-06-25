import { TestBed } from '@angular/core/testing';

import { NotReachedScreenGuard } from './not-reached-screen.guard';

describe('NotReachedScreenGuard', () => {
  let guard: NotReachedScreenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotReachedScreenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
