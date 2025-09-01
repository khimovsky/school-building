import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [CurrencyPipe],
  providers: [CurrencyPipe],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {
  @Input() placeholder: string = '10000';
  @Input() value: number | null = null;
  @Output() valueChange = new EventEmitter<number | null>();

  private readonly currencyPipe = inject(CurrencyPipe);

  protected formatValue(val: number | null): string {
    if (val == null) return '';
    return (this.currencyPipe.transform(val, 'RUB', '', '1.0-0') || '').trim();
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const numericStr: string = input.value.replace(/\D/g, '');
    if (!numericStr || numericStr === '0') {
      this.value = null;
      input.value = '';
      this.valueChange.emit(null);
      return;
    }
    const numeric: number = Number(numericStr);
    this.value = numeric;
    input.value = this.formatValue(this.value);
    this.valueChange.emit(numeric);
  }
}
