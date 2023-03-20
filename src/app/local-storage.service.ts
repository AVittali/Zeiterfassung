import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setItem(key: string, data: any): void {
    console.log(data);
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string): any {

    var value = localStorage.getItem(key);
    if (value === null)
      return null;

    return JSON.parse(value);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}
