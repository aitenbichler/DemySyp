import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStationComponent } from './edit-station.component';

describe('EditStationComponent', () => {
  let component: EditStationComponent;
  let fixture: ComponentFixture<EditStationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStationComponent]
    });
    fixture = TestBed.createComponent(EditStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
