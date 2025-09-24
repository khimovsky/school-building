import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LayoutLogoComponent} from "../logo/layout-logo.component";
import {ButtonPrimaryComponent} from "../../../shared/components/blocks/buttons/primary/button-primary.component";
import {BurgerMenuComponent, BurgerMenuItem} from "../burger-menu/burger-menu.component";
import {NavigationComponent, NavigationItem} from "../navigation/navigation.component";

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterLink, LayoutLogoComponent, ButtonPrimaryComponent, BurgerMenuComponent, NavigationComponent],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss'
})
export class LayoutHeaderComponent {
  protected readonly navigationItems: NavigationItem[] | BurgerMenuItem[] = [
    { label: 'Ознакомиться с проектом', link: 'https://www.mosques.ru/doc.pdf', target: true, nameIcon: 'file-pdf', positionIcon: 'right' },
    { label: 'План проекта', link: 'https://www.mosques.ru/plans.pdf', target: true, nameIcon: 'file-pdf', positionIcon: 'right' },
    { label: 'Банковские реквизиты', link: 'https://www.mosques.ru/rekvizit.pdf', target: true, nameIcon: 'file-pdf', positionIcon: 'right' }
  ];
}
