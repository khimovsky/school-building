import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';

export interface ToggleOption<T = unknown> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent<T = unknown> implements OnInit {
  @Input({ required: true }) options: ToggleOption<T>[] = [];
  @Input() defaultValue?: ToggleOption<T>['value'];

  @Output() change = new EventEmitter<ToggleOption<T>['value']>();

  protected readonly activeValue = signal<ToggleOption<T>['value'] | null>(null);

  ngOnInit(): void {
    if (this.options?.length) {
      this.activeValue.set(this.defaultValue ?? this.options[0].value);
    }
  }

  protected selectOption(value: ToggleOption<T>['value']): void {
    this.activeValue.set(value);
    this.change.emit(value);
  }
}
