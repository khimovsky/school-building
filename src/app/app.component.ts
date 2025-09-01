import {Component, inject, LOCALE_ID, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {FullscreenOverlayComponent} from "./shared/overlays/fullscreen-overlay/fullscreen-overlay.component";
import {OverlayService} from "./shared/overlays/overlay.service";
import {ToastComponent} from "./shared/components/blocks/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullscreenOverlayComponent, AsyncPipe, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-RU' }
  ]
})
export class AppComponent implements OnInit {
  private readonly overlayService = inject(OverlayService);
  protected readonly contentTpl$ = this.overlayService.contentTpl$;

  ngOnInit(): void {
    registerLocaleData(localeRu);
  }
}
