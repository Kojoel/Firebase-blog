import { TestBed } from '@angular/core/testing';

import { BlogsFirebaseService } from './blogs-firebase.service';

describe('BlogsFirebaseService', () => {
  let service: BlogsFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogsFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
