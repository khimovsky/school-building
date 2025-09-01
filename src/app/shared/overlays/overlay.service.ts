import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private readonly contentTplSubject = new BehaviorSubject<TemplateRef<any> | null>(null);
  public readonly contentTpl$ = this.contentTplSubject.asObservable();

  public open(template: TemplateRef<any>): void {
    document.documentElement.style.overflow = 'hidden';
    this.contentTplSubject.next(template);
  }

  public close(): void {
    document.documentElement.style.overflow = '';
    this.contentTplSubject.next(null);
  }
}
