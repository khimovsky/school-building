import {DestroyRef, inject, Injectable} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {map, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ReportDTO} from "./report.model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly path: string = 'https://script.google.com/macros/s/AKfycbycu-HCB7IB4fxTUc7qCkS-myIScujFaCwxN0w3VRm9bw7k08kCqbg6KNs9L_2t00pDlA/exec?getFunction=getBothSums';

  /**
    * Сумма, которую пожертвовали наличными.
    * Эти значения прибавляются к данным, которые возвращает API.
  */
  private readonly reportCash: Omit<ReportDTO, 'params'> = {
    totalSum: 2276471.98,
    dailySum: 30,
    weekSum: 0
  }

  public report(): Observable<ReportDTO> {
    return this.api.get<ReportDTO>(this.path)
      .pipe(
        map(report => ({
          ...report,
          totalSum: (report.totalSum || 0) + (this.reportCash.totalSum || 0),
          dailySum: (report.dailySum || 0) + (this.reportCash.dailySum || 0),
          weekSum: (report.weekSum || 0) + (this.reportCash.weekSum || 0),
        })),
        takeUntilDestroyed(this.destroyRef)
      );
  }
}
