import {Component, inject, Input, TemplateRef, ViewChild} from '@angular/core';
import {IconComponent} from "../../components/elements/icon/icon.component";
import {ButtonSecondaryComponent} from "../../components/blocks/buttons/secondary/button-secondary.component";
import {OverlayService} from "../../overlays/overlay.service";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [IconComponent, ButtonSecondaryComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  @ViewChild('galleryTmp', { static: true }) galleryRef!: TemplateRef<any>;

  @Input() sizePreview: 'small' | 'big' = 'small';
  @Input({ required: true }) images: string[] = [];

  private readonly overlayService = inject(OverlayService);

  protected galleryOpen(): void {
    this.overlayService.open(this.galleryRef);
  }

  protected galleryClose(): void {
    this.overlayService.close();
  }

  protected currentIndex: number = 0;

  protected prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  protected next(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  protected select(index: number): void {
    this.currentIndex = index;
  }
}
