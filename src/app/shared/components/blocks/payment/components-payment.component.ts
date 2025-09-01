import {Component, DestroyRef, inject} from '@angular/core';
import {CurrencyComponent} from "../../inputs/currency/currency.component";
import {CurrencyPipe} from "@angular/common";
import {ButtonSecondaryComponent} from "../buttons/secondary/button-secondary.component";
import {ResponsiveDirective} from "../../../directives/responsive.directive";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ToastService} from "../toast/toast.service";
import {PaymentService} from "../../../services/payment/payment.service";

@Component({
  selector: 'app-components-payment',
  standalone: true,
  imports: [CurrencyComponent, ButtonSecondaryComponent, CurrencyPipe, ResponsiveDirective],
  templateUrl: './components-payment.component.html',
  styleUrl: './components-payment.component.scss'
})
export class ComponentsPaymentComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);
  private readonly paymentService = inject(PaymentService);

  protected readonly presetAmounts: number[] = [100, 250, 500, 1000];
  protected selectedAmount: number | null = null;
  protected customAmount: number | null = null;

  protected onPresetClick(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
  }

  protected onCustomAmountChange(value: number | null): void {
    this.customAmount = value;
    if (value !== null) this.selectedAmount = null;
  }

  private get amountToPay(): number {
    return this.selectedAmount ?? this.customAmount ?? 0;
  }

  protected proceed(): void {
    if (this.amountToPay > 0) {
      this.toastService.show('Ожидайте перенаправление на платежный сервис')
      this.paymentService.pay({
        amount: this.amountToPay,
        description: 'Donate_schoolBuilding',
        prefix: 'schoolBuilding',
        return_url: String(window.location.href),
      })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (): void => this.toastService.show(`Платеж создан, ожидайте`),
          error: (): void => this.toastService.show(`Не удалось создать платеж`)
        });
    } else {
      this.toastService.show('Пожалуйста, выберите или введите сумму')
    }
  }
}
