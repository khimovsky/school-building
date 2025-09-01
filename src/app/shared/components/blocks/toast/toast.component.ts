import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ToastService} from "./toast.service";
import {timer} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('180ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  protected messages: string[] = [];
  private readonly queue: string[] = [];
  private readonly maxVisible: number = 5;

  ngOnInit(): void {
    this.toastService.toast$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((msg: string): void => this.enqueue(msg));
  }

  private enqueue(msg: string): void {
    this.queue.push(msg);
    this.showNext();
  }

  private showNext(): void {
    const msg: string | undefined = this.queue.shift();
    if (!msg || this.messages.length >= this.maxVisible) return;
    this.messages.push(msg);

    timer(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((): void => {
        this.messages = this.messages.filter((m: string): boolean => m !== msg);
        this.showNext();
      });
  }
}
