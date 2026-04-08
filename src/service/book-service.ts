import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = 'http://10.148.51.54:8080/searchBook';
  private readonly httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  getByQuery(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/${query}`, this.httpOptions);
  }

  loadAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl, this.httpOptions);
  }
}
