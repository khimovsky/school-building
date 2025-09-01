import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSubject = new Subject<string>();
  public readonly toast$ = this.toastSubject.asObservable();

  public show(message: string): void {
    this.toastSubject.next(message);
  }
}
