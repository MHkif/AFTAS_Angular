import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CometitionsTableComponent } from './cometitions-table.component';

describe('CometitionsTableComponent', () => {
  let component: CometitionsTableComponent;
  let fixture: ComponentFixture<CometitionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CometitionsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CometitionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
