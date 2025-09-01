import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconComponent} from "../../../shared/components/elements/icon/icon.component";
import {NgTemplateOutlet} from "@angular/common";

export interface NavigationItem {
  label: string;
  link: string;
  target?: boolean;
  nameIcon?: string;
  positionIcon?: 'left' | 'right';
  disabled?: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent, NgTemplateOutlet],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input({ required: true }) items: NavigationItem[] = [];
}
