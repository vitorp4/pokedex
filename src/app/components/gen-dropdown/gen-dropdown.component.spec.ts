import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenDropdownComponent } from './gen-dropdown.component';

describe('GenDropdownComponent', () => {
  let component: GenDropdownComponent;
  let fixture: ComponentFixture<GenDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
