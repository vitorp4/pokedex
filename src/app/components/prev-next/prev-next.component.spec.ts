import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevNextComponent } from './prev-next.component';

describe('PrevNextComponent', () => {
  let component: PrevNextComponent;
  let fixture: ComponentFixture<PrevNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
