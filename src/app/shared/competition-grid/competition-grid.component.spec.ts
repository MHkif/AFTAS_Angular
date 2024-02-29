import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionGridComponent } from './competition-grid.component';

describe('CompetitionGridComponent', () => {
  let component: CompetitionGridComponent;
  let fixture: ComponentFixture<CompetitionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
