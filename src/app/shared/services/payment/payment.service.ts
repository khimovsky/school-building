import {DestroyRef, inject, Injectable} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {PaymentBody, PaymentDTO} from "./payment.model";
import {FuncService} from "../../../core/services/func.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly api = inject(ApiService);
  private readonly func = inject(FuncService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly path: string = 'https://www.mosques.ru/api/paymentMethod/yooKassa/index.php';

  public pay(data: PaymentBody): Observable<PaymentDTO> {
    return this.api.post<PaymentDTO>(this.path, this.func.toFormData(data))
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
