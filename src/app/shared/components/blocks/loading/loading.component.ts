import {Component, Input} from '@angular/core';

export enum LoadingStatus {
  loading = 'loading',
  loaded = 'loaded',
  error = 'error'
}

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() active: boolean = true;
  @Input() size: number = 50;
}
