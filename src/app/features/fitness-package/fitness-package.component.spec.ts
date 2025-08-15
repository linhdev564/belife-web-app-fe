import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessPackageComponent } from './fitness-package.component';

describe('FitnessPackageComponent', () => {
  let component: FitnessPackageComponent;
  let fixture: ComponentFixture<FitnessPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitnessPackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
