import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncService {
  public toFormData(obj: Record<string, any>): FormData {
    return Object.entries(obj).reduce((fd, [key, value]): FormData => {
      if (value !== null && value !== undefined) fd.append(key, value.toString());
      return fd;
    }, new FormData());
  }
}
