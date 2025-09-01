import {AfterViewInit, Component, DestroyRef, ElementRef, inject, Input, signal, ViewChild} from '@angular/core';
import {ButtonSecondaryComponent} from "../buttons/secondary/button-secondary.component";
import {fromEventPattern} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [ButtonSecondaryComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements AfterViewInit {
  @ViewChild('playerWrapper') playerWrapperRef!: ElementRef;

  @Input({ required: true }) src!: string;
  @Input() poster: string = '';

  private readonly destroyRef = inject(DestroyRef);

  protected readonly isPlayerVisible = signal<boolean>(false);
  protected readonly isPlaying = signal<boolean>(false);

  ngAfterViewInit(): void {
    const element: HTMLDivElement = this.playerWrapperRef.nativeElement;

    const intersection$ = fromEventPattern<IntersectionObserverEntry[]>(
      handler => {
        const observer = new IntersectionObserver(entries => handler(entries), {
          rootMargin: '100px',
          threshold: 0.1
        });
        observer.observe(element);
        return observer;
      },
      (_, observer: IntersectionObserver): void => observer.disconnect()
    );

    intersection$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([entry]: IntersectionObserverEntry[]): void => {
        if (entry.isIntersecting) this.isPlayerVisible.set(true);
      });
  }

  protected playVideo(): void {
    this.isPlaying.set(true);
  }
}
