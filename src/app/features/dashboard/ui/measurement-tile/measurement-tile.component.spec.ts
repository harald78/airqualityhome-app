import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementTileComponent } from './measurement-tile.component';

describe('MeasurementTileComponent', () => {
  let component: MeasurementTileComponent;
  let fixture: ComponentFixture<MeasurementTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasurementTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasurementTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
