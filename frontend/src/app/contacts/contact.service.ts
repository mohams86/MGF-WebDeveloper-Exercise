import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  area_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost/api/contacts';
  private companiesApi = 'http://localhost/api/companies';

  constructor(private http: HttpClient) {}

  list(page = 1, search = '', sort = 'firstname', direction = 'asc') {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&search=${search}&sort=${sort}&direction=${direction}`
    );
  }

  get(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // new method to fetch companies
  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>(this.companiesApi);
  }

  reportByArea() {
    return this.http.get<{ area: string, total: number }[]>('http://localhost/api/contacts/report-by-area');
  }
}
