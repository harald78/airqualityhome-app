import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import { IconButtonComponent } from './icon-button.component';
import { IconComponent } from '../icon/icon/icon.component';
import { NgClass } from '@angular/common';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent, IconComponent, NgClass],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on click', () => {
    jest.spyOn(component.iconButtonClick, 'emit');

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.iconButtonClick.emit).toHaveBeenCalledWith(true);
  });

  it('should change color on mouseover and mouseout', fakeAsync(() => {
    fixture.componentRef.setInput('iconColor', 'blue');
    fixture.componentRef.setInput('iconActiveColor', 'red');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.currentColor()).toBe('blue');

    fixture.debugElement.nativeElement.dispatchEvent(new Event('mouseover'));
    fixture.detectChanges();
    expect(component.currentColor()).toBe('red');

    fixture.debugElement.nativeElement.dispatchEvent(new Event('mouseout'));
    fixture.detectChanges();
    expect(component.currentColor()).toBe('blue');
  }));

  it('should have correct initial properties', () => {
    expect(component.text()).toBe('');
    expect(component.icon()).toBe('');
    expect(component.iconColor()).toBe('');
    expect(component.iconActiveColor()).toBe('white');
    expect(component.width()).toBe('14px');
    expect(component.classes()).toBe('btn btn-primary');
    expect(component.disabled()).toBe(false);
  });
});
