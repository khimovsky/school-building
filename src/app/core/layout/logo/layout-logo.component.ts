import {Component, Input} from '@angular/core';
import {IconComponent} from "../../../shared/components/elements/icon/icon.component";
import {ResponsiveDirective} from "../../../shared/directives/responsive.directive";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-layout-logo',
  standalone: true,
  imports: [IconComponent, ResponsiveDirective, RouterLink],
  templateUrl: './layout-logo.component.html',
  styleUrl: './layout-logo.component.scss'
})
export class LayoutLogoComponent {
  @Input() tooltip?: string;
  @Input() size?: 'small' | 'big';
  @Input() color: string = '#FFFFFF33';
}
