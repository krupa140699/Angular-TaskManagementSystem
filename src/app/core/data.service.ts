import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  // GET request
  get<T>(url: string, params?: {}): Observable<T> {
    return this.http.get<T>(url, { params: { ...params } });
  }

  // POST request
  post<T>(url: string, body: {}): Observable<T> {
    return this.http.post<T>(url, { ...body });
  }

  // PUT request
  put<T>(url: string, body: {}): Observable<T> {
    return this.http.put<T>(url, { ...body });
  }

  // DELETE request
  delete<T>(url: string, params?: {}): Observable<T> {
    return this.http.delete<T>(url, { params: { ...params } });
  }
}
