import {Component, Input} from '@angular/core';
import {IconComponent} from "../../../elements/icon/icon.component";

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss'
})
export class ButtonPrimaryComponent {
  @Input() tooltip?: string;
  @Input() color: 'white' | 'dark' = 'dark';
  @Input() disabled: boolean = false;
  @Input() size: 'medium' | 'big' = 'medium';
  @Input() iconName?: string;
  @Input() iconColor: string = 'currentColor';
  @Input() iconOnly: boolean = false;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() adaptive: boolean = true;
}
