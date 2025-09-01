import {Component} from '@angular/core';
import {ButtonPrimaryComponent} from "../../../shared/components/blocks/buttons/primary/button-primary.component";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout-footer.component.html',
  styleUrl: './layout-footer.component.scss'
})
export class LayoutFooterComponent {}
