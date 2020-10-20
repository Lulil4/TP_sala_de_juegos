import { TestBed } from '@angular/core/testing';

import { ItemsToolbarService } from './items-toolbar.service';

describe('ItemsToolbarService', () => {
  let service: ItemsToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
