import {Component, inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {ButtonSecondaryComponent} from "../../../shared/components/blocks/buttons/secondary/button-secondary.component";
import {IconComponent} from "../../../shared/components/elements/icon/icon.component";
import {RouterLink} from "@angular/router";
import {OverlayService} from "../../../shared/overlays/overlay.service";

export interface BurgerMenuItem {
  label: string;
  link: string;
  target?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [ButtonSecondaryComponent, IconComponent, RouterLink],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss'
})
export class BurgerMenuComponent {
  @ViewChild('menuTpl', { static: true }) menuRef!: TemplateRef<any>;
  @Input({ required: true }) items: BurgerMenuItem[] = [];

  private readonly overlayService = inject(OverlayService);

  protected menuOpen(): void {
    this.overlayService.open(this.menuRef);
  }

  protected menuClose(): void {
    this.overlayService.close();
  }
}
