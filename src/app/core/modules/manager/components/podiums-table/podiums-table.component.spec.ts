import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumsTableComponent } from './podiums-table.component';

describe('PodiumsTableComponent', () => {
  let component: PodiumsTableComponent;
  let fixture: ComponentFixture<PodiumsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodiumsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodiumsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
