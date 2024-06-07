import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOffcanvasComponent } from './filter-offcanvas.component';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FilterService} from "../../services/filter-service.service";

describe('FilterOffcanvasComponent', () => {
  let component: FilterOffcanvasComponent;
  let fixture: ComponentFixture<FilterOffcanvasComponent>;
  let filterService: FilterService;
  let activeOffCanvas: NgbActiveOffcanvas

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOffcanvasComponent],
      providers: [NgbActiveOffcanvas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterOffcanvasComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService);
    activeOffCanvas = TestBed.inject(NgbActiveOffcanvas);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setFilter with mode add', () => {
    // given
    const htmlInput = {checked: true} as HTMLInputElement;
    const event = {
      target: htmlInput
    }
    const filterSpy = jest.spyOn(filterService, 'setFilter');

    // when
    component.setFilter(event, 'location', 'Wohnzimmer');

    // then
    expect(filterSpy).toHaveBeenCalledWith({name: 'location', item: 'Wohnzimmer', mode: 'add'});
  });

  it('should call setFilter with mode remove', () => {
    // given
    const htmlInput = {checked: false} as HTMLInputElement;
    const event = {
      target: htmlInput
    }
    const filterSpy = jest.spyOn(filterService, 'setFilter');

    // when
    component.setFilter(event, 'location', 'Schlafzimmer');

    // then
    expect(filterSpy).toHaveBeenCalledWith({name: 'location', item: 'Schlafzimmer', mode: 'remove'});
  });

  it('should return true for isChecked()', () => {
    // given
    component.activeFilters = [{name: 'location', items: ['wohnzimmer']}];
    // when
    const result = component.isChecked('location', 'wohnzimmer');
    // then
    expect(result).toBeTruthy();
  });

  it('should return false for isChecked()', () => {
    // given
    component.activeFilters = [{name: 'location', items: ['wohnzimmer']}];
    // when
    const result = component.isChecked('location', 'schlafzimmer');
    // then
    expect(result).toBeFalsy();
  });
});
