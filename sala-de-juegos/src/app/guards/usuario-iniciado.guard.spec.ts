import { TestBed } from '@angular/core/testing';

import { UsuarioIniciadoGuard } from './usuario-iniciado.guard';

describe('UsuarioIniciadoGuard', () => {
  let guard: UsuarioIniciadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioIniciadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
