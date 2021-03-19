import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {

  location: string = "home";
  constructor() { }


  setLocation(value: string) {
    this.location = value;
  }

  getLocation(): string {
    return this.location;
  }
}
