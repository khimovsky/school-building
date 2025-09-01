import {inject, Injectable} from '@angular/core';
import {catchError, exhaustMap, from, Observable, of, Subject, tap} from "rxjs";
import {ToastService} from "../components/blocks/toast/toast.service";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private readonly toastService = inject(ToastService);

  private shareClick$ = new Subject<void>();

  constructor() {
    this.shareClick$
      .pipe(exhaustMap((): Observable<void | null> => this.handleShare()))
      .subscribe();
  }

  public shareSite(): void {
    this.shareClick$.next();
  }

  private handleShare(): Observable<void | null> {
    const shareData = {
      title: 'Учебный корпус при Мечети «Ихсан»',
      text: 'Поддержите проект строительства Учебного корпуса при Мечети «Ихсан»!',
      url: String(window.location.href)
    };

    const copy$: Observable<void | null> = navigator.clipboard?.writeText
      ? from(navigator.clipboard.writeText(String(shareData.url))).pipe(
        tap((): void => this.toastService.show('Ссылка скопирована')),
        catchError((): Observable<null> => {
          this.toastService.show('Не удалось скопировать ссылку');
          return of(null);
        })
      )
      : of(null);

    const share$: Observable<void | null> = navigator.share
      ? from(navigator.share(shareData)).pipe(
        catchError((): Observable<null> => {
          this.toastService.show('Ссылка уже скопирована');
          return of(null);
        })
      )
      : of(null);

    return copy$.pipe(exhaustMap((): Observable<void | null> => share$));
  }
}
