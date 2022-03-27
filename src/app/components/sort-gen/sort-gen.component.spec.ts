import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortGenComponent } from './sort-gen.component';

describe('SortGenComponent', () => {
  let component: SortGenComponent;
  let fixture: ComponentFixture<SortGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
