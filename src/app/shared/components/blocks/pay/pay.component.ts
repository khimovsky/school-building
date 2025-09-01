import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {OverlayService} from "../../../overlays/overlay.service";
import {ButtonPrimaryComponent} from "../buttons/primary/button-primary.component";
import {LayoutLogoComponent} from "../../../../core/layout/logo/layout-logo.component";
import {ButtonSecondaryComponent} from "../buttons/secondary/button-secondary.component";
import {ToggleComponent, ToggleOption} from "../../inputs/toggle/toggle.component";
import {ComponentsPaymentComponent} from "../payment/components-payment.component";
import {ResponsiveDirective} from "../../../directives/responsive.directive";
import {ShareService} from "../../../services/share.service";

type PayType = 'once' | 'auto';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [ButtonPrimaryComponent, LayoutLogoComponent, ButtonSecondaryComponent, ToggleComponent, ComponentsPaymentComponent, ResponsiveDirective],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent {
  @ViewChild('payTpl', { static: true }) payRef!: TemplateRef<any>;

  private readonly overlayService = inject(OverlayService);
  private readonly shareService = inject(ShareService);

  protected readonly toggleOptions: ToggleOption[] = [
    { label: 'Единоразовый', value: 'once' },
    // { label: 'Автоплатеж', value: 'auto' }
  ] satisfies ToggleOption<PayType>[];

  protected payOpen(): void {
    this.overlayService.open(this.payRef);
  }

  protected payClose(): void {
    this.overlayService.close();
  }

  protected toShare(): void {
    this.shareService.shareSite();
  }

  protected onToggleChange(value: unknown): void {
    // todo: функционал в случае изменения формата платежа
  }
}
