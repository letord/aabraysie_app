import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connected : boolean;
  constructor(private http: HttpClient) {
    this.connected = false;
  }
  isConnected() : boolean {
    return  this.connected;
  }
  setConnected(value : boolean) : void {
    this.connected=value
  }
}
