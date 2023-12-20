import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumsComponent } from './podiums.component';

describe('PodiumsComponent', () => {
  let component: PodiumsComponent;
  let fixture: ComponentFixture<PodiumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodiumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
