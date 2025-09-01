import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {LayoutHeaderComponent} from "../header/layout-header.component";
import {LayoutFooterComponent} from "../footer/layout-footer.component";

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [RouterOutlet, LayoutHeaderComponent, LayoutFooterComponent],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss'
})
export class LayoutMainComponent {}
