import {Component, HostListener, input, OnInit, output, signal, WritableSignal} from '@angular/core';
import {IconComponent} from "../icon/icon/icon.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    IconComponent,
    NgClass
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent implements OnInit {

  @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent) {
    this.currentColor.set(this.iconActiveColor());
  }

  @HostListener('mouseout', ['$event']) onMouseLeave(event: MouseEvent) {
    this.currentColor.set(this.iconColor());
  }

  text = input('');
  icon = input('');
  iconColor = input('');
  iconActiveColor = input('white');
  width = input('14px')
  classes = input('btn btn-primary')

  currentColor: WritableSignal<string> = signal('');

  iconButtonClick = output<boolean>();

  onClick() {
    this.iconButtonClick.emit(true);
  }

  ngOnInit() {
    this.currentColor.set(this.iconColor());
  }
}
