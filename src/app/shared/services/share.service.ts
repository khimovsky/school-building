import {inject, Injectable} from '@angular/core';
import {catchError, exhaustMap, from, Observable, of, Subject, tap} from "rxjs";
import {ToastService} from "../components/blocks/toast/toast.service";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private readonly location = inject(Location);
  private readonly toastService = inject(ToastService);

  private readonly shareClick$ = new Subject<string>();

  constructor() {
    this.shareClick$
      .pipe(exhaustMap((url: string): Observable<void | null> => this.handleShare(url)))
      .subscribe();
  }

  public shareSite(path?: string): void {
    const baseUrl: string = window.location.origin;
    const routePath: string = path ?? this.location.path();
    this.shareClick$.next(`${baseUrl}${routePath ? '/' + routePath.replace(/^\/+/, '') : ''}`);
  }

  private handleShare(url: string): Observable<void | null> {
    const shareData = {
      title: 'Учебный корпус при Мечети «Ихсан»',
      text: 'Поддержите проект строительства Учебного корпуса при Мечети «Ихсан»!',
      url
    };

    if (!navigator.clipboard && !navigator.share) {
      this.toastService.show('Ваш браузер не поддерживает функцию “Поделиться”');
      return of(null);
    }

    const copyText: string = `${shareData.title}\n${shareData.text}\n${shareData.url}`;

    const copy$: Observable<void | null> = navigator.clipboard?.writeText
      ? from(navigator.clipboard.writeText(copyText)).pipe(
        tap((): void => this.toastService.show('Ссылка скопирована')),
        catchError((): Observable<null> => {
          this.toastService.show('Не удалось скопировать ссылку');
          return of(null);
        })
      )
      : of(null);

    const share$: Observable<void | null> = navigator.share
      ? from(navigator.share(shareData)).pipe(
        catchError((): Observable<void | null> => {
          this.toastService.show('Ссылка уже скопирована');
          return from(navigator.clipboard.writeText(copyText)).pipe(
            catchError(() => {
              this.toastService.show('Не удалось скопировать ссылку');
              return of(null);
            })
          );
        })
      )
      : of(null);

    return copy$.pipe(exhaustMap((): Observable<void | null> => share$));
  }
}
