import {Component, Input} from '@angular/core';
import {IconComponent} from "../../../elements/icon/icon.component";

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.scss'
})
export class ButtonSecondaryComponent {
  @Input() tooltip?: string;
  @Input() disabled: boolean = false;
  @Input() active: boolean = false;
  @Input() size: 'small' | 'medium' | 'big' = 'medium';
  @Input() iconName?: string;
  @Input() iconColor: string = 'currentColor';
  @Input() iconOnly: boolean = false;
  @Input() iconPosition: 'left' | 'right' = 'left';
}
