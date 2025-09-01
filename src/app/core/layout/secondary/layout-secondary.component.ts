import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout-secondary',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout-secondary.component.html',
  styleUrl: './layout-secondary.component.scss'
})
export class LayoutSecondaryComponent {}
