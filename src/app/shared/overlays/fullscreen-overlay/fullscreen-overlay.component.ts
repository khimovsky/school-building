import {Component, HostListener, inject, Input, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {OverlayService} from "../overlay.service";

@Component({
  standalone: true,
  selector: 'app-fullscreen-overlay',
  imports: [NgTemplateOutlet],
  templateUrl: 'fullscreen-overlay.component.html',
  styleUrls: ['fullscreen-overlay.component.scss']
})
export class FullscreenOverlayComponent {
  @Input({ required: true }) contentTpl!: TemplateRef<any>

  private readonly overlayService = inject(OverlayService);

  @HostListener('window:keydown.esc', ['$event'])
  private onEsc(event: KeyboardEvent): void {
    event.preventDefault();
    this.overlayService.close();
  }
}
