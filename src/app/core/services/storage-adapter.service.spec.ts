import { TestBed } from '@angular/core/testing';

import { StorageAdapterService } from './storage-adapter.service';

describe('StorageAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageAdapterService = TestBed.get(StorageAdapterService);
    expect(service).toBeTruthy();
  });
});
