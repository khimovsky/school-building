import {Component, inject} from '@angular/core';
import {ToggleComponent, ToggleOption} from "../../shared/components/inputs/toggle/toggle.component";
import {LayoutLogoComponent} from "../../core/layout/logo/layout-logo.component";
import {ButtonSecondaryComponent} from "../../shared/components/blocks/buttons/secondary/button-secondary.component";
import {ComponentsPaymentComponent} from "../../shared/components/blocks/payment/components-payment.component";
import {ResponsiveDirective} from "../../shared/directives/responsive.directive";
import {ShareService} from "../../shared/services/share.service";

type PayType = 'once' | 'auto';

@Component({
  selector: 'app-features-payment',
  standalone: true,
  imports: [LayoutLogoComponent, ToggleComponent, ButtonSecondaryComponent, ComponentsPaymentComponent, ResponsiveDirective],
  templateUrl: 'features-payment.component.html',
  styleUrl: './features-payment.component.scss'
})
export class FeaturesPaymentComponent {
  private readonly shareService = inject(ShareService);

  protected readonly toggleOptions: ToggleOption[] = [
    { label: 'Единоразовый', value: 'once' },
    // { label: 'Автоплатеж', value: 'auto' }
  ] satisfies ToggleOption<PayType>[];

  protected toShare(): void {
    this.shareService.shareSite();
  }

  protected onToggleChange(value: unknown): void {
    // todo: функционал в случае изменения формата платежа
  }
}
