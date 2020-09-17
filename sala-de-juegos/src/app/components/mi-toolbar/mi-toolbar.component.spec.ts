import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiToolbarComponent } from './mi-toolbar.component';

describe('MiToolbarComponent', () => {
  let component: MiToolbarComponent;
  let fixture: ComponentFixture<MiToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
