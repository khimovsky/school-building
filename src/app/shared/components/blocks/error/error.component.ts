import {AfterViewInit, Component, DestroyRef, ElementRef, EventEmitter, inject, Input, Output, signal, ViewChild} from '@angular/core';
import {ButtonPrimaryComponent} from "../buttons/primary/button-primary.component";
import {tap, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export enum ErrorPosition {
  left = 'left',
  center = 'center',
  right = 'right',
}

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ButtonPrimaryComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements AfterViewInit {
  @ViewChild('content', { static: true }) contentRef!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);

  @Input() title: string = 'Ой! Что-то пошло не так..';
  @Input() message: string = 'Если проблема сохраняется, пожалуйста, свяжитесь с нашей поддержкой.';

  @Input() position: ErrorPosition = ErrorPosition.left;

  @Input() showRetryButton: boolean = false;
  @Output() retry = new EventEmitter<void>();

  protected readonly shake = signal<boolean>(false);
  protected hasContent: boolean = false;

  ngAfterViewInit(): void {
    this.runShake();
    const el: HTMLElement = this.contentRef.nativeElement;
    this.hasContent = el && el.childNodes.length > 0;
  }

  protected runRetry(): void {
    this.runShake();
    this.retry.emit();
  }

  private runShake(): void {
    this.shake.set(false);
    timer(0).pipe(
      tap((): void => this.shake.set(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
    timer(400).pipe(
      tap((): void => this.shake.set(false)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
