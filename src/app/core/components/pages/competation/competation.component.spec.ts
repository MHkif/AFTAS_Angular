import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetationComponent } from './competation.component';

describe('CompetationComponent', () => {
  let component: CompetationComponent;
  let fixture: ComponentFixture<CompetationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
