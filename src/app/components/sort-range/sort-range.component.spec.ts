import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortRangeComponent } from './sort-range.component';

describe('SortRangeComponent', () => {
  let component: SortRangeComponent;
  let fixture: ComponentFixture<SortRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
