import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabScrollComponent } from './fab-scroll.component';

describe('FabScrollComponent', () => {
  let component: FabScrollComponent;
  let fixture: ComponentFixture<FabScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
