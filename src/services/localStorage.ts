import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  save(key: string, value: Object|null = null) {
    if(!value) {
      localStorage.removeItem(key)
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  retrieve(key: string): Object|null {
    const stored = localStorage.getItem(key)
    if(!stored) {
      return null
    }
    return JSON.parse(stored);
  }

}