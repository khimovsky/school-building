import {Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private readonly contentTplSubject = new BehaviorSubject<TemplateRef<any> | null>(null);
  public readonly contentTpl$ = this.contentTplSubject.asObservable();

  private scrollY: number = 0;

  public open(template: TemplateRef<any>): void {
    this.scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    this.contentTplSubject.next(template);
  }

  public close(): void {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, this.scrollY);
    this.contentTplSubject.next(null);
  }
}
