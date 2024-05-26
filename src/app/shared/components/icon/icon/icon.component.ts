import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input('path') data: string = 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z';

  @Input() color: string = 'black';

  @Input() width: string = 1.5 + 'rem';
}
