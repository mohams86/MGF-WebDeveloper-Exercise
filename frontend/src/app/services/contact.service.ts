import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {}

  getContacts(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/contacts`, { params });
  }

  getContact(id: number) {
    return this.http.get(`${this.apiUrl}/contacts/${id}`);
  }

  createContact(data: any) {
    return this.http.post(`${this.apiUrl}/contacts`, data);
  }

  updateContact(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/contacts/${id}`, data);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`);
  }

  contactsByArea() {
    return this.http.get(`${this.apiUrl}/reports/contacts-by-area`);
  }
}
