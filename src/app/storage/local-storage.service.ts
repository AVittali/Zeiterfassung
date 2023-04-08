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

  /*
  private convertValue(value: any): any {
    console.log("ConvertValue");
    console.log({convertValue: value});
    
    console.log({type: typeof value});

    const parsed = JSON.parse(value);
    console.log({typeParsed: typeof parsed});
    
    if (Array.isArray(parsed)) {
      console.log("isArray");
    }

    return value;
  }

  private mapValue(value: any, key?: string) {

    if (key?.toLowerCase().endsWith('datum')) {
      return new Date(value);
    }

    return value;
  }
  */
}
