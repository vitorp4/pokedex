import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PikachuLoadingComponent } from './pikachu-loading.component';

describe('PikachuLoadingComponent', () => {
  let component: PikachuLoadingComponent;
  let fixture: ComponentFixture<PikachuLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PikachuLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PikachuLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
