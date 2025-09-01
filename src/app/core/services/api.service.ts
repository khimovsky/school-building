import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);

  private formatErrors(error: HttpErrorResponse): Observable<never> {
    return throwError((): HttpErrorResponse => error);
  }

  public get<T>(path: string, params?: HttpParams | {[param: string]: string | string[]}): Observable<T> {
    return this.http
      .get<T>(path, { params })
      .pipe(
        tap((res: T): void => console.debug(`GET ${path}`, res)),
        catchError(this.formatErrors)
      );
  }

  public post<T>(path: string, body: unknown, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http
      .post<T>(path, body, options)
      .pipe(
        tap((res: T): void => console.debug(`POST ${path}`, res)),
        catchError(this.formatErrors)
      );
  }

  public put<T>(path: string, body: unknown, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http
      .put<T>(path, body, options)
      .pipe(
        tap((res: T): void => console.debug(`PUT ${path}`, res)),
        catchError(this.formatErrors)
      );
  }

  public delete<T>(path: string, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.http
      .delete<T>(path, options)
      .pipe(
        tap((res: T): void => console.debug(`DELETE ${path}`, res)),
        catchError(this.formatErrors)
      );
  }
}
