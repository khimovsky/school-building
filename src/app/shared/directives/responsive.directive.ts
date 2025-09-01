import {Directive, HostListener, Input, OnInit, signal} from '@angular/core';

@Directive({
  selector: '[appResponsive]',
  standalone: true,
  exportAs: 'appResponsive'
})
export class ResponsiveDirective implements OnInit {
  @Input() breakpoint: number = 1024;
  readonly isMobile = signal<boolean>(false);

  ngOnInit(): void {
    this.updateSize();
  }

  @HostListener('window:resize')
  private onResize(): void {
    this.updateSize();
  }

  private updateSize(): void {
    this.isMobile.set(window.innerWidth <= this.breakpoint);
  }
}
